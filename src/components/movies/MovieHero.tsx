import { Film } from "lucide-react";
import { TMDBMovieDetail, TMDBTVDetail } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb";

type MediaDetail = TMDBMovieDetail | TMDBTVDetail;

type MovieHeroProps = {
  media: MediaDetail;
  type: "movie" | "tv";
  director: string;
};

const MovieHero = async ({ media, type, director }: MovieHeroProps) => {
  const title =
    type === "movie"
      ? (media as TMDBMovieDetail).title
      : (media as TMDBTVDetail).name;

  const releaseYear =
    type === "movie"
      ? (media as TMDBMovieDetail).release_date?.slice(0, 4)
      : (media as TMDBTVDetail).first_air_date?.slice(0, 4);

  const runtime =
    type === "movie"
      ? `${(media as TMDBMovieDetail).runtime} min`
      : `${(media as TMDBTVDetail).number_of_seasons} seasons`;
  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
      <Link
        href="/discover"
        className="text-sm text-muted hover:text-primary transition-colors mb-4 inline-block"
      >
        ← Back to discover
      </Link>
      <div className="flex gap-6">
        <div className="relative w-36 h-52 flex-shrink-0">
          {media.poster_path ? (
            <Image
              src={getImageUrl(media.poster_path, "w300")}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-raised rounded-xl flex items-center justify-center">
              <Film className="w-8 h-8 text-muted" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary mb-1">{title}</h1>
          <p className="text-muted text-sm mb-3">
            {[releaseYear, director, runtime].filter(Boolean).join(" · ")}
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {media.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-xs px-3 py-1 rounded-full bg-raised border border-raised text-muted"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 my-4">
            <div>
              <p className="text-2xl font-semibold text-gold">
                {media.vote_average.toFixed(1)}
              </p>
              <p className="text-xs text-muted">
                TMDB · {media.vote_count} ratings
              </p>
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
