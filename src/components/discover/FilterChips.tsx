"use client";
import { useState } from "react";

const filters = [
  "All",
  "Movies",
  "TV shows",
  "Trending",
  "New releases",
  "Top rated",
];

const FilterChips = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="my-4 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelected(filter)}
          className={`px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer
            ${
              selected === filter
                ? "bg-brand border-brand text-white font-medium"
                : "bg-raised border-raised text-muted hover:text-primary"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
