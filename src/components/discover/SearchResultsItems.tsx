import Image from "next/image";
import Link from "next/link";
import { Film } from "lucide-react";
import { getImageUrl, getTitle, getYear } from "@/lib/tmdb";
import type { TMDBMovie } from "@/types";

type SearchResultItemProps = {
  movie: TMDBMovie;
  onSelect: () => void;
};

const SearchResultItem = ({ movie, onSelect }: SearchResultItemProps) => {
  const type = movie.media_type === "tv" ? "tv" : "movie";

  return (
    <Link
      href={`/media/${type}/${movie.id}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 hover:bg-raised transition-colors border-b border-raised last:border-b-0"
    >
      {/* Poster thumbnail */}
      <div className="relative w-8 h-12 flex-shrink-0 bg-raised rounded overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={getImageUrl(movie.poster_path, "w200")}
            alt={getTitle(movie)}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="w-4 h-4 text-muted" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary truncate">
          {getTitle(movie)}
        </p>
        <p className="text-xs text-muted">
          {getYear(movie)}
          {getYear(movie) && " · "}
          {type === "tv" ? "TV Show" : "Movie"}
        </p>
      </div>

      {/* Rating */}
      {movie.vote_average > 0 && (
        <span className="text-xs text-gold font-medium flex-shrink-0">
          {movie.vote_average !== null ? movie.vote_average.toFixed(1) : "N/A"}
        </span>
      )}
    </Link>
  );
};

export default SearchResultItem;
