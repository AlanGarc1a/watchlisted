# Watchlisted

A full stack movie and TV tracking application built with Next.js 14, TypeScript, Supabase, and the Anthropic Claude API. Users can discover content, track what they've watched, rate titles, and get personalized AI-powered recommendations.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)

---

## Features

### Core
- Browse trending movies and TV shows powered by the TMDB API
- Filter content by category — trending, new releases, top rated, movies, TV shows
- Search by title with real-time results
- Full movie and TV show detail pages with cast, genres, runtime, and streaming availability

### Watchlist
- Add movies and TV shows to your personal watchlist
- Track status per title — Want to Watch, Watching, Watched, or Dropped
- Rate titles on a 1–10 star scale
- Remove titles from your watchlist at any time

### Authentication
- Sign in with Google OAuth
- Register and log in with email and password
- Secure password hashing with bcrypt
- JWT session management with route protection middleware

### AI Features (powered by Anthropic Claude)
- **AI Search** — describe what you want in natural language and Claude finds matching titles
- **Tonight's Pick** — a daily personalized recommendation based on your watch history
- **AI Summary** — a spoiler-free movie summary generated for each detail page
- **Should I Watch This?** — a personalized honest recommendation based on your taste profile

### Profile
- Personal stats — titles watched, hours watched, average rating, completion rate
- Genre breakdown showing your viewing patterns
- Recent activity feed
- Watchlist preview

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with custom design tokens |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma 7 |
| Authentication | NextAuth.js v5 |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Movie Data | TMDB API |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Login and register pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Protected app pages
│   │   ├── discover/
│   │   ├── media/[type]/[id]/
│   │   ├── profile/
│   │   └── watchlist/
│   └── api/
│       ├── auth/             # NextAuth route handler
│       ├── ai/               # AI feature endpoints
│       │   ├── search/
│       │   ├── summary/
│       │   ├── should-i-watch/
│       │   └── tonights-pick/
│       ├── register/         # User registration
│       ├── search/           # TMDB search proxy
│       └── watchlist/        # Watchlist CRUD
├── components/
│   ├── atoms/                # Base UI elements (Input, Label)
│   ├── auth/                 # Login and register forms
│   ├── discover/             # Search, filters, Tonight's Pick
│   ├── landing/              # Landing page sections
│   ├── layout/               # Navbar, footer, mobile menu
│   ├── molecules/            # Composed components (TextField)
│   ├── movies/               # Movie cards, hero, rating, actions
│   ├── profile/              # Profile header, stats, activity
│   └── shared/               # Reusable components (StarRating, SectionHeader)
├── hooks/
│   ├── useDebounce.ts
│   └── useWatchlist.ts
├── lib/
│   ├── auth.ts               # NextAuth config
│   ├── prisma.ts             # Prisma client singleton
│   └── tmdb.ts               # TMDB API wrapper and types
└── types/
    └── index.ts              # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account and project
- A [TMDB](https://www.themoviedb.org) API account
- An [Anthropic](https://console.anthropic.com) API account
- A [Google Cloud](https://console.cloud.google.com) project with OAuth 2.0 credentials

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/watchlisted.git
cd watchlisted
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
# Database
DATABASE_URL="postgresql://postgres.xxxx:PASSWORD@aws-x-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxx:PASSWORD@aws-x-us-east-1.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# TMDB
TMDB_API_KEY=your_tmdb_read_access_token
TMDB_BASE_URL=https://api.themoviedb.org/3

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Generate a `NEXTAUTH_SECRET` by running:

```bash
openssl rand -base64 32
```

### 4. Set up the database

Push the Prisma schema to your Supabase database:

```bash
npx prisma db push
npx prisma generate
```

### 5. Seed the database (optional)

Populate the database with realistic QA data for local development:

```bash
npm run seed
```

This creates three test users with watchlist items, activity events, reviews, and follow relationships.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Setup Guides

### TMDB API Key
1. Create a free account at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API**
3. Request an API key and select **Developer**
4. Copy the **API Read Access Token** (the long JWT starting with `eyJ`)

### Google OAuth
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project
3. Go to **APIs & Services → Credentials**
4. Create an **OAuth 2.0 Client ID** for a Web application
5. Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs
6. Copy the Client ID and Client Secret

### Supabase Connection Strings
1. Go to your Supabase project dashboard
2. Click **Connect** at the top
3. Select the **ORM** tab
4. Copy both the pooled (`DATABASE_URL`) and direct (`DIRECT_URL`) connection strings
5. Replace `[YOUR-PASSWORD]` with your database password

---

## Database Schema

```
User
├── Account          (OAuth provider accounts)
├── Session          (active sessions)
├── WatchlistItem    (movies/shows saved by the user)
├── Review           (written reviews)
├── Activity         (feed events — rated, watched, added, dropped)
├── followers        (Follow relationships)
└── following        (Follow relationships)

Movie
├── WatchlistItem
├── Review
└── Activity

Follow
├── follower (User)
└── following (User)
```

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/watchlist?tmdbId=` | Check if movie is in watchlist |
| `POST` | `/api/watchlist` | Add movie to watchlist |
| `PATCH` | `/api/watchlist` | Update status or rating |
| `DELETE` | `/api/watchlist` | Remove from watchlist |
| `POST` | `/api/register` | Register with email and password |
| `GET` | `/api/search?query=` | Search movies and TV shows |
| `POST` | `/api/ai/search` | Natural language AI search |
| `GET` | `/api/ai/tonights-pick` | Get personalized daily recommendation |
| `POST` | `/api/ai/summary` | Generate AI movie summary |
| `POST` | `/api/ai/should-i-watch` | Get personalized watch recommendation |

---

## Key Implementation Details

### Server vs Client Components
The app follows Next.js App Router best practices — pages and data fetching happen in server components while interactive elements (watchlist buttons, search, dropdowns) are isolated client components. This minimizes JavaScript sent to the browser.

### Watchlist State Sync
Multiple components on the movie detail page need to reflect the same watchlist state. This is solved using browser custom events — when one component updates the watchlist it broadcasts a `watchlist-updated` event and all other hook instances for that movie re-fetch the latest state.

### AI Graceful Degradation
All AI features degrade gracefully when unavailable. If the Claude API is down or out of credits the app falls back to standard TMDB data — users always see useful content regardless of AI availability.

### Route Protection
A Next.js proxy middleware runs on every request, reading the session cookie to determine authentication state. Logged out users are redirected to `/login` and logged in users are redirected away from auth pages to `/discover`.

---

## Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run seed     # Seed database with QA data
```

---

## License

MIT

---

## Acknowledgements

- [TMDB](https://www.themoviedb.org) for the movie and TV data API
- [Anthropic](https://www.anthropic.com) for the Claude AI API
- [Supabase](https://supabase.com) for the hosted PostgreSQL database
- [Vercel](https://vercel.com) for deployment infrastructure
