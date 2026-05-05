import Link from "next/link";
import MovieCard from "../movies/MovieCard";
import { mockMovies } from "@/lib/mockData";
import MovieCardGrid from "../movies/MovieGrid";

const WatchlistPreview = () => {
  return (
    <div className="bg-deep border border-raised p-4 mt-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-primary font-semibold">My watchlist</p>
        <Link
          href="/watchlist"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          See all
        </Link>
      </div>
      <MovieCardGrid>
        {mockMovies.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieCardGrid>
    </div>
  );
};

export default WatchlistPreview;
