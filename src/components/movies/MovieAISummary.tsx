"use client";
import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import type { TMDBMovieDetail, TMDBTVDetail } from "@/types";

type MediaDetail = TMDBMovieDetail | TMDBTVDetail;

type MovieAISummaryProps = {
  media: MediaDetail;
  type: "movie" | "tv";
};

type ErrorType = "insufficient_credits" | "ai_failed" | null;

const MovieAISummary = ({ media, type }: MovieAISummaryProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const title =
          type === "movie"
            ? (media as TMDBMovieDetail).title
            : (media as TMDBTVDetail).name;

        const releaseYear =
          type === "movie"
            ? (media as TMDBMovieDetail).release_date?.slice(0, 4)
            : (media as TMDBTVDetail).first_air_date?.slice(0, 4);

        const runtime =
          type === "movie" ? (media as TMDBMovieDetail).runtime : null;

        const genres = media.genres.map((g) => g.name).join(", ");

        const res = await fetch("/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            overview: media.overview,
            genres,
            runtime,
            releaseYear,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error as ErrorType);
          return;
        }

        setSummary(data.summary);
      } catch {
        setError("ai_failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [media, type]);

  if (isLoading) {
    return (
      <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Loader2 className="w-3 h-3 text-violet animate-spin" />
          <p className="text-violet text-xs uppercase tracking-widest font-medium">
            ✦ AI summary
          </p>
        </div>
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-raised rounded w-full" />
          <div className="h-3 bg-raised rounded w-4/5" />
          <div className="h-3 bg-raised rounded w-3/5" />
        </div>
      </div>
    );
  }

  if (error === "insufficient_credits") {
    return (
      <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
        <p className="text-violet text-xs uppercase tracking-widest font-medium mb-2">
          Overview
        </p>
        <p className="text-muted text-sm leading-relaxed">
          {media.overview ?? "No overview available."}
        </p>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
        <p className="text-violet text-xs uppercase tracking-widest font-medium mb-2">
          Overview
        </p>
        <p className="text-muted text-sm leading-relaxed">
          {media.overview ?? "No overview available."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
      <p className="text-violet text-xs uppercase tracking-widest font-medium mb-3">
        ✦ AI summary
      </p>
      <p className="text-muted text-sm leading-relaxed">{summary}</p>
    </div>
  );
};

export default MovieAISummary;
