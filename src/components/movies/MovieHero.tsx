import { Film } from "lucide-react";
import { Movie } from "@/types";
import Link from "next/link";

type MovieHeroProps = {
  movie: Movie;
};

const MovieHero = ({ movie }: MovieHeroProps) => {
  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
      <Link
        href="/discover"
        className="text-sm text-muted hover:text-primary transition-colors mb-4 inline-block"
      >
        ← Back to discover
      </Link>
      <div className="flex gap-6">
        <div className="w-36 h-52 bg-raised rounded-lg mb-4 flex items-center justify-center">
          <Film className="w-12 h-12 text-muted" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-primary text-xl">{movie?.title}</p>
          <p className="text-muted text-sm">
            {movie?.year} · {movie?.director} · {movie?.duration} min ·{" "}
            {movie?.genre}
          </p>
          <div className="flex gap-2 flex-wrap my-3">
            {movie?.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-raised border border-raised text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 my-4">
            <div>
              <p className="text-2xl font-semibold text-gold">8.3</p>
              <p className="text-xs text-muted">TMDB · 18.4k ratings</p>
            </div>
            <div className="w-px h-8 bg-raised" />
            <div>
              <p className="text-xl font-semibold text-teal">7.8</p>
              <p className="text-xs text-muted">Friends avg</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-brand text-white py-2 px-4 rounded-lg hover:bg-rose transition-colors">
              ✓ Mark as watched
            </button>
            <button className=" border border-raised text-primary py-2 px-4 rounded-lg">
              + Watchlist
            </button>
            <button className="border border-violet/30 text-violet py-2 px-4 bg-violet/15 rounded-lg hover:bg-violet/20 transition-colors">
              ✦ Should I watch this?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
