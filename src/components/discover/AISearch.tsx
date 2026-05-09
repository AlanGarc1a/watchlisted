"use client";
import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, AlertCircle } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import type { TMDBMovie } from "@/types";
import SearchResults from "./SearchResults";

type AISearchError = "insufficient_credits" | "ai_search_failed" | null;

const AISearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [aiError, setAiError] = useState<AISearchError>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Regular search
  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(debouncedQuery)}`,
        );
        const data = await res.json();
        setResults(data.results ?? []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    search();
  }, [debouncedQuery]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setAiError(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // AI search
  const handleAISearch = async () => {
    if (!query.trim()) return;

    setIsAILoading(true);
    setIsOpen(false);
    setAiError(null);

    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      // Handle specific error codes from the API
      if (!res.ok) {
        setAiError(data.error as AISearchError);
        return;
      }

      setResults(data.results ?? []);
      setIsOpen(true);
    } catch (error) {
      setAiError("ai_search_failed");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAISearch();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setAiError(null);
  };

  return (
    <div ref={wrapperRef} className="relative mb-4">
      <div className="rounded-xl bg-raised p-2 flex items-center gap-2 border border-raised">
        {isLoading || isAILoading ? (
          <Loader2 className="w-4 h-4 text-muted animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-4 h-4 text-muted flex-shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 text-sm text-primary focus:outline-none placeholder:text-muted"
          placeholder='Try "something like Succession but funnier"...'
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-muted hover:text-primary transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleAISearch}
          disabled={isAILoading}
          className="rounded-full border border-violet/30 px-3 py-1 bg-violet/15 text-violet hover:bg-violet/20 text-xs font-medium flex-shrink-0 disabled:opacity-50 transition-colors"
        >
          {isAILoading ? "..." : "✦ AI search"}
        </button>
      </div>

      {/* AI loading state */}
      {isAILoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-deep border border-raised rounded-xl p-4 z-50 text-center">
          <p className="text-violet text-sm animate-pulse">
            ✦ Claude is finding the perfect matches...
          </p>
        </div>
      )}

      {/* Error states */}
      {aiError && !isAILoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-deep border border-raised rounded-xl p-4 z-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
            <div>
              {aiError === "insufficient_credits" ? (
                <>
                  <p className="text-sm font-medium text-primary mb-1">
                    AI search is temporarily unavailable
                  </p>
                  <p className="text-xs text-muted">
                    The AI credits have run out. Regular search still works —
                    type a title above to find movies and shows.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-primary mb-1">
                    Something went wrong
                  </p>
                  <p className="text-xs text-muted">
                    AI search failed. Try again or use regular search instead.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isOpen && results.length > 0 && !aiError && (
        <SearchResults
          results={results}
          onSelect={() => {
            setIsOpen(false);
            setQuery("");
          }}
        />
      )}
    </div>
  );
};

export default AISearch;
