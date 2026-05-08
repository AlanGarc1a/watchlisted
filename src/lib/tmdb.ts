import {
  TMDBCredits,
  TMDBMovie,
  TMDBMovieDetail,
  TMDBSearchResult,
  TMDBTVDetail,
  TMDBWatchProvider,
} from "@/types";

const BASE_URL = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  "Content-Type": "application/json",
};

async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
    //cache for 1 hour
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status} on ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

export async function getTrending(
  timeWindow: "day" | "week" = "week",
): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<{ results: TMDBMovie[] }>(
    `/trending/all/${timeWindow}`,
  );
  return data.results;
}

export async function searchMulti(query: string): Promise<TMDBMovie[]> {
  if (!query) return [];
  const data = await tmdbFetch<TMDBSearchResult>(
    `/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
  );
  // Filter out people — we only want movies and TV
  return data.results.filter(
    (result) => result.media_type === "movie" || result.media_type === "tv",
  );
}

export async function searchMovies(movie: string): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<{ results: TMDBMovie[] }>(
    `/search/${movie}?include_adult=false`,
  );
  return data.results;
}

export async function getMovieById(movieId: number): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${movieId}`);
}

export async function getTVById(id: number): Promise<TMDBTVDetail> {
  return tmdbFetch<TMDBTVDetail>(`/tv/${id}`);
}

export async function getMovieCredits(creditId: number): Promise<TMDBCredits> {
  return tmdbFetch<TMDBCredits>(`/movie/${creditId}/credits`);
}

export async function getTVCredits(id: number): Promise<TMDBCredits> {
  return tmdbFetch<TMDBCredits>(`/tv/${id}/credits`);
}

export async function getRecommendations(
  movieId: number,
  type: "movie" | "tv" = "movie",
): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<{ results: TMDBMovie[] }>(
    `/${type}/${movieId}/recommendations`,
  );
  return data.results;
}

export async function getNowPlaying(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<{ results: TMDBMovie[] }>("/movie/now_playing");
  return data.results.map((movie) => ({
    ...movie,
    media_type: "movie" as const,
  }));
}

export async function getTopRated(
  type: "movie" | "tv" = "movie",
): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<{ results: TMDBMovie[] }>(`/${type}/top_rated`);
  return data.results.map((item) => ({
    ...item,
    media_type: type as "movie" | "tv",
  }));
}

export function getImageUrl(
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
): string {
  if (!path) return "/placeholder-poster.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

// Helper to get display title — movies use title, TV uses name
export function getTitle(movie: TMDBMovie): string {
  return movie.title ?? movie.name ?? "Unknown";
}

// Helper to get display year from date string
export function getYear(movie: TMDBMovie): string {
  const date = movie.release_date ?? movie.first_air_date;
  if (!date) return "";
  return new Date(date).getFullYear().toString();
}

export async function getWatchProviders(
  movieId: number,
  type: "movie" | "tv" = "movie",
): Promise<TMDBWatchProvider[]> {
  const data = await tmdbFetch<{ results: TMDBWatchProvider[] }>(
    `/${type}/${movieId}/watch/providers`,
  );
  return data.results;
}
