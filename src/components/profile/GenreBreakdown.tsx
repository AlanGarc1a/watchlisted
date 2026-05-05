const genres = [
  { id: 1, genre: "Drama", color: "bg-violet", percentage: 72 },
  { id: 2, genre: "Thriller", color: "bg-teal", percentage: 58 },
  { id: 3, genre: "Sci-fi", color: "bg-brand", percentage: 44 },
  { id: 4, genre: "Comedy", color: "bg-gold", percentage: 29 },
  { id: 5, genre: "Docs", color: "bg-rose", percentage: 21 },
];

const GenreBreakdown = () => {
  return (
    <div className="bg-deep border border-raised mt-4 rounded-lg p-4">
      <p className="text-primary font-semibold mb-2">Genre Breakdown</p>
      <div className="flex flex-col gap-3">
        {genres.map((genre) => {
          return (
            <div key={genre.id} className="flex items-center gap-3">
              <div className="text-muted text-xs w-16 flex-shrink-0">
                {genre.genre}
              </div>
              <div className="flex-1 h-2 bg-raised rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${genre.color}`}
                  style={{ width: `${genre.percentage}%` }}
                />
              </div>
              <div className="text-muted text-xs">{genre.percentage}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenreBreakdown;
