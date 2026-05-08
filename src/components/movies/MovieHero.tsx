import Link from "next/link";
import MediaActions from "./MediaActions";
import {
  type TMDBMovieDetail,
  type TMDBTVDetail,
  type TMDBMovie,
} from "@/types";
import Image from "next/image";
import { Film } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";

type MovieHeroProps = {
  media: TMDBMovieDetail | TMDBTVDetail;
  type: "movie" | "tv";
  director: string;
  tmdbId: number;
};

const MovieHero = ({ media, type, director, tmdbId }: MovieHeroProps) => {
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

  // Build a TMDBMovie object for the watchlist hook
  const movieForWatchlist: TMDBMovie = {
    id: media.id,
    title: type === "movie" ? (media as TMDBMovieDetail).title : undefined,
    name: type === "tv" ? (media as TMDBTVDetail).name : undefined,
    overview: media.overview,
    poster_path: media.poster_path,
    backdrop_path: media.backdrop_path,
    vote_average: media.vote_average,
    vote_count: media.vote_count,
    genre_ids: [],
    adult: false,
    media_type: type,
  };

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
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-2xl font-semibold text-gold">
                {media.vote_average.toFixed(1)}
              </p>
              <p className="text-xs text-muted">
                TMDB · {media.vote_count.toLocaleString()} ratings
              </p>
            </div>
            <div className="w-px h-8 bg-raised" />
            <div>
              <p className="text-xl font-semibold text-teal">7.8</p>
              <p className="text-xs text-muted">Friends avg</p>
            </div>
          </div>

          <MediaActions tmdbId={tmdbId} movie={movieForWatchlist} />
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
