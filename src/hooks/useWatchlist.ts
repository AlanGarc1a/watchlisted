"use client";
import { useState, useEffect } from "react";
import type { TMDBMovie, WatchlistStatus } from "@/types";

type WatchlistItem = {
  id: string;
  status: WatchlistStatus;
  rating: number | null;
};

export function useWatchlist(tmdbId: number) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [item, setItem] = useState<WatchlistItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkWatchlist = async () => {
    const res = await fetch(`/api/watchlist?tmdbId=${tmdbId}`);
    const data = await res.json();
    setInWatchlist(data.inWatchlist);
    setItem(data.item);
  };

  // Listen for updates from other hook instances
  useEffect(() => {
    checkWatchlist();

    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.tmdbId === tmdbId) {
        checkWatchlist();
      }
    };

    window.addEventListener("watchlist-updated", handleUpdate);
    return () => window.removeEventListener("watchlist-updated", handleUpdate);
  }, [tmdbId]);

  const broadcastUpdate = () => {
    window.dispatchEvent(
      new CustomEvent("watchlist-updated", { detail: { tmdbId } }),
    );
  };

  const addToWatchlist = async (movie: TMDBMovie) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: movie.id,
          title: movie.title ?? movie.name ?? "Unknown",
          posterPath: movie.poster_path ?? null,
          mediaType: movie.media_type === "tv" ? "tv" : "movie",
        }),
      });
      const data = await res.json();
      setInWatchlist(true);
      setItem(data);
      broadcastUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (tmdbId: number, status: WatchlistStatus) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId, status }),
      });
      const data = await res.json();
      setItem(data);
      broadcastUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const updateRating = async (tmdbId: number, rating: number) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId, rating }),
      });
      const data = await res.json();
      setItem(data);
      broadcastUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWatchlist = async (tmdbId: number) => {
    setIsLoading(true);
    try {
      await fetch("/api/watchlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });
      setInWatchlist(false);
      setItem(null);
      broadcastUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inWatchlist,
    item,
    isLoading,
    addToWatchlist,
    updateStatus,
    updateRating,
    removeFromWatchlist,
  };
}
