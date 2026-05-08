"use client";
import { useRouter, usePathname } from "next/navigation";

const filters = [
  { id: "all", label: "All" },
  { id: "movies", label: "Movies" },
  { id: "tv", label: "TV shows" },
  { id: "new", label: "New releases" },
  { id: "top", label: "Top rated" },
];

type FilterChipsProps = {
  selected: string;
};

const FilterChips = ({ selected }: FilterChipsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (filterId: string) => {
    router.push(`${pathname}?filter=${filterId}`);
  };

  return (
    <div className="my-4 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleSelect(filter.id)}
          className={`px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer
            ${
              selected === filter.id
                ? "bg-brand border-brand text-white font-medium"
                : "bg-raised border-raised text-muted hover:text-primary"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
