import AISearch from "@/components/discover/AISearch";
import MovieCard from "@/components/movies/MovieCard";
import MovieCardGrid from "@/components/movies/MovieGrid";
import TonightsPick from "@/components/discover/TonightsPick";
import SectionHeader from "@/components/shared/SectionHeader";
import FilterChips from "@/components/discover/FilterChips";
import { getTrending, getNowPlaying, getTopRated } from "@/lib/tmdb";
import { TMDBMovie } from "@/types";
import AISearchBanner from "@/components/discover/AISearchBanner";

type PageProps = {
  searchParams: Promise<{ filter?: string }>;
};

const headerMap: Record<string, string> = {
  all: "Trending this week",
  movies: "Trending movies",
  tv: "Trending TV shows",
  new: "New release",
  top: "Top rated",
};
async function getMoviesByFilter(filter: string): Promise<TMDBMovie[]> {
  switch (filter) {
    case "movies": {
      const data = await getTrending("week");
      return data.filter((item) => item.media_type === "movie");
    }
    case "tv": {
      const data = await getTrending("week");
      // Filter to only TV shows from the trending results
      return data.filter((item) => item.media_type === "tv");
    }
    case "new":
      return getNowPlaying();
    case "top":
      return getTopRated();
    default:
      return getTrending("week");
  }
}

const Discover = async ({ searchParams }: PageProps) => {
  const { filter = "all" } = await searchParams;
  const movies = await getMoviesByFilter(filter);
  const header = headerMap[filter] ?? "Trending this week";

  return (
    <>
      <AISearch />
      <AISearchBanner />
      <TonightsPick />
      <FilterChips selected={filter} />
      <SectionHeader title={header} linkText="See all" />
      <MovieCardGrid>
        {movies.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieCardGrid>
    </>
  );
};

export default Discover;
