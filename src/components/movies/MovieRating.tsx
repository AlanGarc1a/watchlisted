"use client";
import StarRating from "../shared/StarRating";
import { useState } from "react";

type Status = "want" | "watching" | "watched" | "dropped";

const statuses: { value: Status; label: string }[] = [
  { value: "want", label: "Want to watch" },
  { value: "watching", label: "Watching" },
  { value: "watched", label: "✓ Watched" },
  { value: "dropped", label: "Dropped" },
];

const MovieRating = () => {
  const [status, setStatus] = useState<Status | null>(null);

  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6 space-y-2">
      <p className="text-primary">Your rating</p>
      <StarRating />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`rounded-xl px-4 py-2 text-sm border transition-colors
              ${
                status === s.value
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
