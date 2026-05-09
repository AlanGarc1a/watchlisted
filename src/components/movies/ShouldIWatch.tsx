"use client";
import { useState, useEffect } from "react";
import { Sparkles, Loader2, X } from "lucide-react";
import type { TMDBMovieDetail, TMDBTVDetail } from "@/types";

type MediaDetail = TMDBMovieDetail | TMDBTVDetail;

type ShouldIWatchProps = {
  media: MediaDetail;
  type: "movie" | "tv";
};

const ShouldIWatch = ({ media, type }: ShouldIWatchProps) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `should-i-watch-${media.id}`;

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setRecommendation(cached);
    }
  }, [cacheKey]);

  const handleClick = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (recommendation) {
      setIsOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

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

      const res = await fetch("/api/ai/should-i-watch", {
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
        setError(
          data.error === "insufficient_credits"
            ? "AI is temporarily unavailable."
            : "Something went wrong. Try again.",
        );
        setIsOpen(true);
        return;
      }

      localStorage.setItem(cacheKey, data.recommendation);
      setRecommendation(data.recommendation);
      setIsOpen(true);
    } catch {
      setError("Something went wrong. Try again.");
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="border border-violet/30 text-violet text-sm py-2 px-4 bg-violet/15 rounded-lg hover:bg-violet/20 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Sparkles className="w-3 h-3" />
        )}
        {isLoading ? "Asking Claude..." : "Should I watch this?"}
      </button>

      {isOpen && (
        <div className="bg-violet/10 border border-violet/20 rounded-xl p-4 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-muted hover:text-primary transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-violet text-xs uppercase tracking-widest font-medium mb-2">
            ✦ Claude says
          </p>
          {error ? (
            <p className="text-muted text-sm">{error}</p>
          ) : (
            <p className="text-sm text-primary leading-relaxed pr-4">
              {recommendation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShouldIWatch;
