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

  const director = credits.crew.find((person) => person.job === "Director");

  return (
    <>
      <MovieHero
        media={media}
        type={type}
        director={director?.name ?? "Unknown"}
      />
      <MovieAISummary />
      <MovieRating />
      <MovieFriends />
    </>
  );
};

export default MediaDetailPage;
