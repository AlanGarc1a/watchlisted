"use client";
import { useWatchlist } from "@/hooks/useWatchlist";
import StarRating from "../shared/StarRating";
import type { TMDBMovie, WatchlistStatus } from "@/types";

const statuses: { value: WatchlistStatus; label: string }[] = [
  { value: "WANT_TO_WATCH", label: "Want to watch" },
  { value: "WATCHED", label: "✓ Watched" },
  { value: "WATCHING", label: "Watching" },
  { value: "DROPPED", label: "Dropped" },
];

type MovieRatingProps = {
  tmdbId: number;
  movie: TMDBMovie;
};

const MovieRating = ({ tmdbId, movie }: MovieRatingProps) => {
  const {
    item,
    isLoading,
    updateStatus,
    updateRating,
    inWatchlist,
    addToWatchlist,
  } = useWatchlist(tmdbId);

  const handleStatusChange = async (status: WatchlistStatus) => {
    if (!inWatchlist) {
      await addToWatchlist(movie);
    }
    await updateStatus(tmdbId, status);
  };

  const handleRatingChange = async (rating: number) => {
    if (!inWatchlist) {
      await addToWatchlist(movie);
    }
    await updateRating(tmdbId, rating);
  };

  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6 space-y-4">
      <p className="text-primary font-semibold text-sm">Your rating</p>

      <StarRating rating={item?.rating ?? 0} onChange={handleRatingChange} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statuses.map((s) => (
          <button
            key={s.value}
            disabled={isLoading}
            onClick={() => handleStatusChange(s.value)}
            className={`rounded-xl px-4 py-2 text-sm border transition-colors
              ${
                item?.status === s.value
                  ? "bg-teal/15 text-teal border-teal/30"
                  : "bg-deep border-raised text-muted hover:border-violet/30"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieRating;
