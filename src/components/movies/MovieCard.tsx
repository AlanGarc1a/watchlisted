import { getImageUrl, getTitle } from "@/lib/tmdb";
import { TMDBMovie } from "@/types";
import { Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MovieCardProps = {
  movie: TMDBMovie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const type = movie.media_type === "tv" ? "tv" : "movie";
  return (
    <Link
      href={`
      /media/${type}/${movie.id}
    `}
    >
      <div
        key={movie.id}
        className="border border-raised rounded-xl cursor-pointer overflow-hidden hover:border-violet/50 transition-colors"
      >
        <div className="relative w-full aspect-[2/3] bg-raised">
          {movie.poster_path ? (
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={getTitle(movie)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Film className="w-8 h-8 text-muted" />
            </div>
          )}

          {/* Score badge */}
          <div className="absolute top-2 right-2 bg-deep/80 text-gold text-xs font-semibold px-2 py-1 rounded-lg">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </div>
        </div>
        <div className="p-2">
          <div className="mb-2">
            <p className="font-semibold">{movie.title}</p>
            <p className="text-xs text-muted">
              {movie.release_date?.split("-")[0] ??
                movie.first_air_date?.slice(0, 4) ??
                "unknown"}{" "}
              · {movie.title ?? movie.name ?? "Unknown"}{" "}
            </p>
          </div>
          <button className="w-full text-center border border-raised rounded-lg py-2 text-sm hover:bg-raised cursor-pointer">
            + Watchlist
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
