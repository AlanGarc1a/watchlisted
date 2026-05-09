import { WatchlistItem, Movie } from "@/generated/prisma";

type WatchlistItemWithMovie = WatchlistItem & {
  movie: Movie;
};

type GenreBreakdownProps = {
  items: WatchlistItemWithMovie[];
};

const genreColors: Record<string, string> = {
  Drama: "bg-violet",
  Thriller: "bg-teal",
  Action: "bg-brand",
  Comedy: "bg-gold",
  Horror: "bg-rose",
  "Sci-Fi": "bg-violet",
  Romance: "bg-rose",
  Documentary: "bg-teal",
};

const GenreBreakdown = ({ items }: GenreBreakdownProps) => {
  const watched = items.filter((i) => i.status === "WATCHED");

  const genreCounts: Record<string, number> = {};
  watched.forEach((item) => {
    const genre = item.movie.genre ?? "Other";
    genreCounts[genre] = (genreCounts[genre] ?? 0) + 1;
  });

  // Sort by count and take top 5
  const sorted = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const max = sorted[0]?.[1] ?? 1;

  if (sorted.length === 0) {
    return (
      <div className="bg-deep border border-raised rounded-lg mt-4 p-4">
        <p className="text-primary font-semibold mb-2">Genre breakdown</p>
        <p className="text-muted text-xs text-center py-8">
          Watch some movies to see your genre breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-deep border border-raised rounded-lg mt-4 p-4">
      <p className="text-primary font-semibold mb-4">Genre breakdown</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([genre, count]) => (
          <div key={genre} className="flex items-center gap-3">
            <span className="text-muted text-xs w-20 flex-shrink-0">
              {genre}
            </span>
            <div className="flex-1 h-2 bg-raised rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${genreColors[genre] ?? "bg-violet"}`}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-muted text-xs w-6 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreBreakdown;
