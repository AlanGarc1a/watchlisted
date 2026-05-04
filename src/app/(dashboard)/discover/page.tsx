import AISearch from "@/components/discover/AISearch";
import MovieCard from "@/components/movies/MovieCard";
import MovieCardGrid from "@/components/movies/MovieGrid";
import { mockMovies } from "@/lib/mockData";
import TonightsPick from "@/components/discover/TonightsPick";
import SectionHeader from "@/components/shared/SectionHeader";
import FilterChips from "@/components/discover/FilterChips";

const Discover = () => {
  return (
    <>
      <AISearch />
      <TonightsPick />
      <FilterChips />
      <SectionHeader title="Trending this week" linkText="See all" />
      <MovieCardGrid>
        {mockMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieCardGrid>
    </>
  );
};

export default Discover;
