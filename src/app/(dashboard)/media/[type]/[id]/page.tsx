import {
  getMovieById,
  getMovieCredits,
  getTVById,
  getTVCredits,
} from "@/lib/tmdb";
import MovieHero from "@/components/movies/MovieHero";
import MovieAISummary from "@/components/movies/MovieAISummary";
import MovieRating from "@/components/movies/MovieRating";
import MovieFriends from "@/components/movies/MovieFriends";
import type { TMDBMovie, TMDBMovieDetail, TMDBTVDetail } from "@/types";

type PageProps = {
  params: Promise<{ type: string; id: string }>;
};

const MediaDetailPage = async ({ params }: PageProps) => {
  const { type, id } = await params;
  const mediaId = Number(id);

  // Handle invalid type
  if (type !== "movie" && type !== "tv") {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">Invalid media type</p>
      </div>
    );
  }

  // Fetch the right data based on type
  const [media, credits] = await Promise.all([
    type === "movie" ? getMovieById(mediaId) : getTVById(mediaId),
    type === "movie" ? getMovieCredits(mediaId) : getTVCredits(mediaId),
  ]);

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
    media_type: type as "movie" | "tv",
  };
  const director = credits.crew.find((person) => person.job === "Director");

  return (
    <>
      <MovieHero
        tmdbId={mediaId}
        media={media}
        type={type}
        director={director?.name ?? "Unknown"}
      />
      <MovieAISummary media={media} type={type as "movie" | "tv"} />
      <MovieRating movie={movieForWatchlist} tmdbId={mediaId} />
      <MovieFriends />
    </>
  );
};

export default MediaDetailPage;
