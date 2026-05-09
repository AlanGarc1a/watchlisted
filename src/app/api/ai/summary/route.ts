import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { title, overview, genres, runtime, releaseYear } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a film critic writing a brief, spoiler-free summary for a movie app.

Movie: ${title}
Year: ${releaseYear ?? "Unknown"}
Genres: ${genres ?? "Unknown"}
Runtime: ${runtime ? `${runtime} minutes` : "Unknown"}
Overview: ${overview ?? "No overview available"}

Write a 2-3 sentence spoiler-free summary that:
- Captures the tone and feel of the movie
- Mentions what kind of audience would enjoy it
- Is honest but not overly critical
- Does NOT reveal plot twists or endings

Return only the summary text, no labels or formatting.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "ai_failed" }, { status: 500 });
    }

    return NextResponse.json({ summary: content.text });
  } catch (error: any) {
    console.error("AI summary error:", error);

    if (error?.status === 400 || error?.status === 429) {
      return NextResponse.json(
        { error: "insufficient_credits" },
        { status: 402 },
      );
    }

    return NextResponse.json({ error: "ai_failed" }, { status: 500 });
  }
}
