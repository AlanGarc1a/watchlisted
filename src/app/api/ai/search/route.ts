import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { searchMulti } from "@/lib/tmdb";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a movie and TV recommendation expert. 
          
A user is searching for: "${query}"

Return a JSON array of exactly 6 movie or TV show titles that best match this description. 
Only return the JSON array, nothing else. No explanation, no markdown, just the raw JSON array.

Example format:
["The Bear", "Succession", "Abbott Elementary", "Veep", "Arrested Development", "Schitt's Creek"]

Rules:
- Only include real, existing movies and TV shows
- Mix movies and TV shows when relevant
- Consider mood, tone, genre, pacing, and themes
- Do not include titles the user mentioned in their query`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ results: [] });
    }

    const cleanText = content.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const titles: string[] = JSON.parse(cleanText);
    const searchPromises = titles.map((title) => searchMulti(title));
    const searchResults = await Promise.all(searchPromises);
    const movies = searchResults.map((r) => r[0]).filter(Boolean);

    return NextResponse.json({ results: movies });
  } catch (error: any) {
    console.error("AI search error:", error);

    // ✅ Detect specifically the low credits error
    if (
      error?.status === 400 &&
      error?.error?.type === "invalid_request_error"
    ) {
      return NextResponse.json(
        { error: "insufficient_credits" },
        { status: 402 },
      );
    }

    return NextResponse.json({ error: "ai_search_failed" }, { status: 500 });
  }
}
