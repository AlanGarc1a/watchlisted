import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, overview, genres, runtime, releaseYear } = await req.json();

    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId: session.user.id },
      include: { movie: true },
      orderBy: { updatedAt: "desc" },
      take: 15,
    });

    const watchHistory =
      watchlistItems.length > 0
        ? watchlistItems
            .map(
              (item) =>
                `${item.movie.title} — ${item.status}${item.rating ? ` (rated ${item.rating}/10)` : ""}`,
            )
            .join("\n")
        : "No watch history yet";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `You are a trusted friend who knows this person's taste in movies and TV perfectly.

They are considering watching:
Title: ${title}
Year: ${releaseYear ?? "Unknown"}
Genres: ${genres ?? "Unknown"}
Runtime: ${runtime ? `${runtime} minutes` : "Unknown"}
Overview: ${overview}

Their watch history:
${watchHistory}

Give them a SHORT honest recommendation (3-4 sentences max):
- Start with a clear yes or no
- Reference specific things they have watched to justify your answer
- Be honest — if it might not be for them say so
- If they have no history give a general recommendation based on the movie itself

Return only the recommendation text, no labels or extra formatting.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "ai_failed" }, { status: 500 });
    }

    return NextResponse.json({ recommendation: content.text });
  } catch (error: any) {
    console.error("Should I watch error:", error);

    if (error?.status === 400 || error?.status === 429) {
      return NextResponse.json(
        { error: "insufficient_credits" },
        { status: 402 },
      );
    }

    return NextResponse.json({ error: "ai_failed" }, { status: 500 });
  }
}
