"use client";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { TMDBMovie } from "@/types";

type MediaActionsProps = {
  tmdbId: number;
  movie: TMDBMovie;
};

const MediaActions = ({ tmdbId, movie }: MediaActionsProps) => {
  const {
    inWatchlist,
    item,
    isLoading,
    addToWatchlist,
    updateStatus,
    removeFromWatchlist,
  } = useWatchlist(tmdbId);

  const isWatched = item?.status === "WATCHED";

  const handleWatchlistToggle = async () => {
    if (inWatchlist) {
      await removeFromWatchlist(tmdbId);
    } else {
      await addToWatchlist(movie);
    }
  };

  const handleMarkAsWatched = async () => {
    if (!inWatchlist) {
      await addToWatchlist(movie);
    }
    await updateStatus(tmdbId, "WATCHED");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        disabled={isLoading}
        onClick={handleMarkAsWatched}
        className={`text-sm py-2 px-4 rounded-lg transition-colors disabled:opacity-50
          ${
            isWatched
              ? "bg-teal text-deep"
              : "bg-brand text-white hover:bg-rose"
          }`}
      >
        {isLoading ? "..." : isWatched ? "✓ Watched" : "Mark as watched"}
      </button>

      <button
        disabled={isLoading}
        onClick={handleWatchlistToggle}
        className={`text-sm py-2 px-4 rounded-lg border transition-colors disabled:opacity-50
          ${
            inWatchlist
              ? "border-teal/30 bg-teal/15 text-teal"
              : "border-raised text-primary hover:bg-raised"
          }`}
      >
        {isLoading ? "..." : inWatchlist ? "✓ Saved" : "+ Watchlist"}
      </button>

      <button className="border border-violet/30 text-violet text-sm py-2 px-4 bg-violet/15 rounded-lg hover:bg-violet/20 transition-colors">
        ✦ Should I watch this?
      </button>
    </div>
  );
};

export default MediaActions;
