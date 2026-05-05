import { mockMovies } from "@/lib/mockData";
import MovieHero from "@/components/movies/MovieHero";
import MovieAISummary from "@/components/movies/MovieAISummary";
import MovieRating from "@/components/movies/MovieRating";
import MovieFriends from "@/components/movies/MovieFriends";

type PageProps = {
  params: Promise<{ id: string }>;
};

const MovieDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const foundMovie = mockMovies.find((movie) => movie.id === Number(id));
  if (!foundMovie) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">Movie not found</p>
      </div>
    );
  }
  return (
    <>
      <MovieHero movie={foundMovie} />
      <MovieAISummary />
      <MovieRating />
      <MovieFriends />
    </>
  );
};

export default MovieDetailsPage;
