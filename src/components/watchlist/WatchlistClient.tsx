"use client";
import { useState } from "react";
import WatchlistCard from "./WatchlistCard";

type Status = "ALL" | "WANT_TO_WATCH" | "WATCHING" | "WATCHED" | "DROPPED";

const filters: { label: string; value: Status }[] = [
  { label: "All", value: "ALL" },
  { label: "Want to watch", value: "WANT_TO_WATCH" },
  { label: "Watching", value: "WATCHING" },
  { label: "Watched", value: "WATCHED" },
  { label: "Dropped", value: "DROPPED" },
];

type WatchlistClientProps = {
  items: any[];
};

const WatchlistClient = ({ items }: WatchlistClientProps) => {
  const [selected, setSelected] = useState<Status>("ALL");

  const filtered =
    selected === "ALL"
      ? items
      : items.filter((item) => item.status === selected);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelected(filter.value)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors
              ${
                selected === filter.value
                  ? "bg-brand border-brand text-white font-medium"
                  : "bg-raised border-raised text-muted hover:text-primary"
              }`}
          >
            {filter.label}
            <span className="ml-1 opacity-60">
              {filter.value === "ALL"
                ? items.length
                : items.filter((i) => i.status === filter.value).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted text-sm">
            {selected === "ALL"
              ? "Your watchlist is empty. Start adding movies and shows."
              : `No titles with status "${selected.toLowerCase().replace("_", " ")}"`}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <WatchlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistClient;
