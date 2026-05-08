import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const addSchema = z.object({
  tmdbId: z.number(),
  title: z.string(),
  posterPath: z.string().nullable(),
  mediaType: z.enum(["movie", "tv"]),
  rating: z.number().nullable().optional(),
});

const updateSchema = z.object({
  tmdbId: z.number(),
  status: z
    .enum(["WANT_TO_WATCH", "WATCHING", "WATCHED", "DROPPED"])
    .optional(),
  rating: z.number().min(1).max(10).nullable().optional(),
});

const deleteSchema = z.object({
  tmdbId: z.number(),
});

export async function POST(request: Request) {
  try {
    console.log("1. POST /api/watchlist called");
    const session = await auth();
    console.log("2. Session:", session?.user?.id);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("3. Body received:", body);
    const result = addSchema.safeParse(body);
    console.log("4. Validation result:", result.success);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message ?? "Invalid request" },
        { status: 400 },
      );
    }

    console.log("5. About to upsert movie");

    const { tmdbId, title, posterPath, mediaType } = result.data;

    const movie = await prisma.movie.upsert({
      where: { tmdbId },
      update: {},
      create: {
        tmdbId,
        title,
        posterPath,
        genre: mediaType,
      },
    });

    const watchlistItem = await prisma.watchlistItem.upsert({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        movieId: movie.id,
        status: "WANT_TO_WATCH",
      },
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        movieId: movie.id,
        type: "ADDED",
      },
    });

    return NextResponse.json(watchlistItem, { status: 201 });
  } catch (error) {
    console.error("Watchlist POST error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const { tmdbId, status, rating } = result.data;

    // Find the movie in our database
    const movie = await prisma.movie.findUnique({
      where: { tmdbId },
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Movie not found in database" },
        { status: 404 },
      );
    }

    // Update the watchlist item
    const watchlistItem = await prisma.watchlistItem.update({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
      data: {
        ...(status && { status }),
        ...(rating !== undefined && { rating }),
      },
    });

    // Create activity for status changes
    if (status) {
      const activityMap = {
        WATCHED: "WATCHED",
        WATCHING: "ADDED",
        WANT_TO_WATCH: "ADDED",
        DROPPED: "DROPPED",
      } as const;

      await prisma.activity.create({
        data: {
          userId: session.user.id,
          movieId: movie.id,
          type: activityMap[status],
          rating: rating ?? null,
        },
      });
    }

    return NextResponse.json(watchlistItem);
  } catch (error) {
    console.error("Watchlist PATCH error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ─── DELETE — remove from watchlist ────────────────────────
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = deleteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { tmdbId } = result.data;

    const movie = await prisma.movie.findUnique({
      where: { tmdbId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    await prisma.watchlistItem.delete({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Watchlist DELETE error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ─── GET — check if movie is in watchlist ──────────────────
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tmdbId = Number(searchParams.get("tmdbId"));

    if (!tmdbId) {
      return NextResponse.json(
        { error: "tmdbId is required" },
        { status: 400 },
      );
    }

    const movie = await prisma.movie.findUnique({
      where: { tmdbId },
    });

    if (!movie) {
      return NextResponse.json({ inWatchlist: false, item: null });
    }

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: movie.id,
        },
      },
    });

    return NextResponse.json({
      inWatchlist: !!watchlistItem,
      item: watchlistItem,
    });
  } catch (error) {
    console.error("Watchlist GET error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
