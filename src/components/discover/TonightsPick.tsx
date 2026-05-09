"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getTitle } from "@/lib/tmdb";
import type { TMDBMovie } from "@/types";
import { useWatchlist } from "@/hooks/useWatchlist";

type TonightsPickData = {
  movie: TMDBMovie;
  reason: string;
};

type ErrorType = "insufficient_credits" | "ai_failed" | "not_found" | null;

const TonightsPick = () => {
  const [data, setData] = useState<TonightsPickData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  // In TonightsPick.tsx useEffect
  useEffect(() => {
    const fetch_pick = async () => {
      // Check if we already have a pick for today
      const cached = localStorage.getItem("tonights-pick");
      if (cached) {
        const { data, date } = JSON.parse(cached);
        const today = new Date().toDateString();
        if (date === today) {
          setData(data);
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh pick
      try {
        const res = await fetch("/api/ai/tonights-pick");
        const json = await res.json();
        if (!res.ok) {
          setError(json.error as ErrorType);
          return;
        }
        // Cache for today
        localStorage.setItem(
          "tonights-pick",
          JSON.stringify({
            data: json,
            date: new Date().toDateString(),
          }),
        );
        setData(json);
      } catch {
        setError("ai_failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetch_pick();
  }, []);

  if (isLoading) {
    return (
      <div className="my-4 p-4 bg-raised border border-raised rounded-xl animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-violet/20" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-raised rounded w-24" />
            <div className="h-4 bg-raised rounded w-48" />
            <div className="h-3 bg-raised rounded w-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error) return null;

  // No data
  if (!data) return null;

  const type = data.movie.media_type === "tv" ? "tv" : "movie";

  return (
    <TonightsPickCard movie={data.movie} reason={data.reason} type={type} />
  );
};

type TonightsPickCardProps = {
  movie: TMDBMovie;
  reason: string;
  type: "movie" | "tv";
};

const TonightsPickCard = ({ movie, reason, type }: TonightsPickCardProps) => {
  const { inWatchlist, isLoading, addToWatchlist } = useWatchlist(movie.id);

  return (
    <div className="my-4 bg-violet/10 border border-violet/20 rounded-xl p-4">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-violet/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-violet" />
        </div>

        {/* Poster thumbnail */}
        {movie.poster_path && (
          <Link href={`/media/${type}/${movie.id}`}>
            <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={getImageUrl(movie.poster_path, "w200")}
                alt={getTitle(movie)}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-violet text-xs font-medium uppercase tracking-widest mb-1">
            ✦ Tonight&apos;s pick
          </p>
          <Link href={`/media/${type}/${movie.id}`}>
            <p className="text-primary font-semibold text-base hover:text-violet transition-colors">
              {getTitle(movie)}
            </p>
          </Link>
          <p className="text-muted text-xs mt-1 truncate">{reason}</p>
        </div>

        {/* Add to watchlist */}
        <button
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            addToWatchlist(movie);
          }}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex-shrink-0 disabled:opacity-50
            ${
              inWatchlist
                ? "border-teal/30 bg-teal/15 text-teal"
                : "border-raised text-muted hover:bg-raised"
            }`}
        >
          {isLoading ? "..." : inWatchlist ? "✓ Saved" : "+ Add to list"}
        </button>
      </div>
    </div>
  );
};

export default TonightsPick;
