import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { searchMulti } from "@/lib/tmdb";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(req: Request) {
  try {
    console.log("1. Tonight's pick called");

    const session = await auth();
    console.log("2. Session:", session?.user?.id);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId: session.user.id },
      include: { movie: true },
      orderBy: { updatedAt: "desc" },
      take: 20,
    });
    console.log("3. Watch history count:", watchlistItems.length);

    const watchHistory = watchlistItems.map((item) => ({
      title: item.movie.title,
      status: item.status,
      rating: item.rating,
    }));

    const historyContext =
      watchHistory.length > 0
        ? watchHistory
            .map(
              (item) =>
                `${item.title} — ${item.status}${item.rating ? ` (rated ${item.rating}/10)` : ""}`,
            )
            .join("\n")
        : "No watch history yet";

    console.log("4. Calling Claude...");

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a movie and TV recommendation expert.

Based on this user's watch history recommend ONE perfect movie or TV show for them to watch tonight.

Watch history:
${historyContext}

Return ONLY a JSON object with this exact format, nothing else:
{
  "title": "The exact movie or show title",
  "reason": "One sentence explaining why this is perfect for them tonight",
  "type": "movie or tv"
}`,
        },
      ],
    });

    console.log("5. Claude responded");

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "ai_failed" }, { status: 500 });
    }

    console.log("6. Raw Claude text:", content.text);

    const cleanText = content.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const recommendation = JSON.parse(cleanText);
    console.log("7. Parsed recommendation:", recommendation);

    const searchResults = await searchMulti(recommendation.title);
    console.log("8. TMDB results:", searchResults.length);

    const movie = searchResults[0];

    if (!movie) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    console.log("9. Success — returning movie:", movie.title ?? movie.name);

    return NextResponse.json({
      movie,
      reason: recommendation.reason,
    });
  } catch (error: any) {
    console.error("Tonight's pick error:", error);
    console.error("Error type:", error?.type);
    console.error("Error status:", error?.status);
    console.error("Error message:", error?.message);

    if (error?.status === 400) {
      return NextResponse.json(
        { error: "insufficient_credits" },
        { status: 402 },
      );
    }

    return NextResponse.json({ error: "ai_failed" }, { status: 500 });
  }
}
