import { Movie } from "@/types";
import { Film } from "lucide-react";
type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div key={movie.id} className="border border-raised rounded-xl">
      <div>
        <div className="w-full h-48 bg-raised relative rounded-t-xl flex items-center justify-center">
          <Film className="w-8 h-8 text-muted" />
          <div className="absolute top-2 right-2 bg-deep text-gold rounded-xl px-2 py-1 text-sm">
            {movie.rating}
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="mb-2">
          <p className="font-semibold">{movie.title}</p>
          <p className="text-xs text-muted">
            {movie.year} · {movie.genre} ·{" "}
            {movie.duration ? `${movie.duration}m` : ""}
          </p>
        </div>
        <button className="w-full text-center border border-raised rounded-lg py-2 text-sm hover:bg-raised cursor-pointer">
          + Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
