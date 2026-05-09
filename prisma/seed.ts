import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Clean existing data ───────────────────────────────
  // Delete in correct order to respect foreign key constraints
  await prisma.activity.deleteMany();
  await prisma.review.deleteMany();
  await prisma.watchlistItem.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  // ─── Create users ──────────────────────────────────────
  const sara = await prisma.user.create({
    data: {
      name: "Sara Kim",
      email: "sara@example.com",
      image: null,
    },
  });

  const marcus = await prisma.user.create({
    data: {
      name: "Marcus Rodriguez",
      email: "marcus@example.com",
      image: null,
    },
  });

  const alex = await prisma.user.create({
    data: {
      name: "Alex Lee",
      email: "alex@example.com",
      image: null,
    },
  });

  console.log("👤 Created users");

  // ─── Create movies ─────────────────────────────────────
  // These are real TMDB ids so the app can fetch real data
  const oppenheimer = await prisma.movie.create({
    data: {
      tmdbId: 872585,
      title: "Oppenheimer",
      posterPath: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      genre: "movie",
      rating: 8.1,
      runtime: 181,
      releaseYear: 2023,
      director: "Christopher Nolan",
    },
  });

  const shogun = await prisma.movie.create({
    data: {
      tmdbId: 126308,
      title: "Shōgun",
      posterPath: "/7O4iVfOMQmdCSxhOg4mMCxMSCvA.jpg",
      genre: "tv",
      rating: 8.8,
      runtime: null,
      releaseYear: 2024,
      director: "Rachel Kondo",
    },
  });

  const dune2 = await prisma.movie.create({
    data: {
      tmdbId: 693134,
      title: "Dune: Part Two",
      posterPath: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      genre: "movie",
      rating: 8.5,
      runtime: 166,
      releaseYear: 2024,
      director: "Denis Villeneuve",
    },
  });

  const theBear = await prisma.movie.create({
    data: {
      tmdbId: 136315,
      title: "The Bear",
      posterPath: "/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
      genre: "tv",
      rating: 8.6,
      runtime: null,
      releaseYear: 2022,
      director: "Christopher Storer",
    },
  });

  const pastLives = await prisma.movie.create({
    data: {
      tmdbId: 1064213,
      title: "Past Lives",
      posterPath: "/k3waqVXSnFQisMkBpGkzkSzerUL.jpg",
      genre: "movie",
      rating: 7.9,
      runtime: 106,
      releaseYear: 2023,
      director: "Celine Song",
    },
  });

  const severance = await prisma.movie.create({
    data: {
      tmdbId: 95396,
      title: "Severance",
      posterPath: "/lI98F7SBmcppKMVu6nf4dDzqVzj.jpg",
      genre: "tv",
      rating: 8.7,
      runtime: null,
      releaseYear: 2022,
      director: "Dan Erickson",
    },
  });

  const succession = await prisma.movie.create({
    data: {
      tmdbId: 73586,
      title: "Succession",
      posterPath: "/e2X8zoKSuGHFpxTZLHjucFsAF4u.jpg",
      genre: "tv",
      rating: 8.9,
      runtime: null,
      releaseYear: 2018,
      director: "Jesse Armstrong",
    },
  });

  const interstellar = await prisma.movie.create({
    data: {
      tmdbId: 157336,
      title: "Interstellar",
      posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      genre: "movie",
      rating: 8.4,
      runtime: 169,
      releaseYear: 2014,
      director: "Christopher Nolan",
    },
  });

  console.log("🎬 Created movies");

  // ─── Create watchlist items ────────────────────────────

  // Sara's watchlist — drama and thriller fan, high rater
  await prisma.watchlistItem.createMany({
    data: [
      {
        userId: sara.id,
        movieId: oppenheimer.id,
        status: "WATCHED",
        rating: 10,
      },
      {
        userId: sara.id,
        movieId: shogun.id,
        status: "WATCHED",
        rating: 9,
      },
      {
        userId: sara.id,
        movieId: succession.id,
        status: "WATCHED",
        rating: 10,
      },
      {
        userId: sara.id,
        movieId: theBear.id,
        status: "WATCHING",
        rating: null,
      },
      {
        userId: sara.id,
        movieId: dune2.id,
        status: "WANT_TO_WATCH",
        rating: null,
      },
    ],
  });

  // Marcus's watchlist — sci-fi fan, critical rater
  await prisma.watchlistItem.createMany({
    data: [
      {
        userId: marcus.id,
        movieId: oppenheimer.id,
        status: "WATCHED",
        rating: 7,
      },
      {
        userId: marcus.id,
        movieId: dune2.id,
        status: "WATCHED",
        rating: 9,
      },
      {
        userId: marcus.id,
        movieId: interstellar.id,
        status: "WATCHED",
        rating: 9,
      },
      {
        userId: marcus.id,
        movieId: severance.id,
        status: "WATCHING",
        rating: null,
      },
      {
        userId: marcus.id,
        movieId: succession.id,
        status: "DROPPED",
        rating: null,
      },
    ],
  });

  // Alex's watchlist — balanced watcher
  await prisma.watchlistItem.createMany({
    data: [
      {
        userId: alex.id,
        movieId: oppenheimer.id,
        status: "WATCHED",
        rating: 9,
      },
      {
        userId: alex.id,
        movieId: pastLives.id,
        status: "WATCHED",
        rating: 8,
      },
      {
        userId: alex.id,
        movieId: theBear.id,
        status: "WATCHED",
        rating: 9,
      },
      {
        userId: alex.id,
        movieId: shogun.id,
        status: "WANT_TO_WATCH",
        rating: null,
      },
    ],
  });

  console.log("📋 Created watchlist items");

  // ─── Create activity ───────────────────────────────────

  await prisma.activity.createMany({
    data: [
      // Sara's activity
      {
        userId: sara.id,
        movieId: oppenheimer.id,
        type: "WATCHED",
        rating: 10,
      },
      {
        userId: sara.id,
        movieId: shogun.id,
        type: "RATED",
        rating: 9,
      },
      {
        userId: sara.id,
        movieId: theBear.id,
        type: "ADDED",
        rating: null,
      },

      // Marcus's activity
      {
        userId: marcus.id,
        movieId: dune2.id,
        type: "WATCHED",
        rating: 9,
      },
      {
        userId: marcus.id,
        movieId: succession.id,
        type: "DROPPED",
        rating: null,
      },
      {
        userId: marcus.id,
        movieId: interstellar.id,
        type: "RATED",
        rating: 9,
      },

      // Alex's activity
      {
        userId: alex.id,
        movieId: oppenheimer.id,
        type: "RATED",
        rating: 9,
      },
      {
        userId: alex.id,
        movieId: pastLives.id,
        type: "WATCHED",
        rating: 8,
      },
    ],
  });

  console.log("📣 Created activity");

  // ─── Create follows ────────────────────────────────────

  await prisma.follow.createMany({
    data: [
      // Sara follows Marcus and Alex
      { followerId: sara.id, followingId: marcus.id },
      { followerId: sara.id, followingId: alex.id },

      // Marcus follows Sara
      { followerId: marcus.id, followingId: sara.id },

      // Alex follows Sara and Marcus
      { followerId: alex.id, followingId: sara.id },
      { followerId: alex.id, followingId: marcus.id },
    ],
  });

  console.log("👥 Created follows");

  // ─── Create reviews ────────────────────────────────────

  await prisma.review.createMany({
    data: [
      {
        userId: sara.id,
        movieId: oppenheimer.id,
        content:
          "One of the best films of the decade. Cillian Murphy is absolutely incredible.",
      },
      {
        userId: marcus.id,
        movieId: oppenheimer.id,
        content: "Great but the courtroom stuff dragged in the second half.",
      },
      {
        userId: alex.id,
        movieId: oppenheimer.id,
        content:
          "Murphy is incredible in this. The Trinity sequence alone is worth the runtime.",
      },
    ],
  });

  console.log("✍️  Created reviews");

  console.log("✅ Seeding complete!");
  console.log(`
    Users created:
    - Sara Kim      (${sara.email})
    - Marcus Rodriguez (${marcus.email})
    - Alex Lee      (${alex.email})
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
