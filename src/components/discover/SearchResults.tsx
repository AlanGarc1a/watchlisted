import type { TMDBMovie } from "@/types";
import SearchResultItem from "./SearchResultsItems";

type SearchResultsProps = {
  results: TMDBMovie[];
  onSelect: () => void;
};

const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-deep border border-raised rounded-xl overflow-hidden z-50 shadow-lg">
      {results.map((result) => (
        <SearchResultItem key={result.id} movie={result} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SearchResults;
