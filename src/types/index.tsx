export type TMDBMovie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv" | "person";
  adult: boolean;
};

export type TMDBMovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  spoken_languages: { english_name: string }[];
};

export type TMDBTVDetail = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
  status: string;
  networks: { name: string }[];
};

export type TMDBCredits = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }[];
};

export type TMDBSearchResult = {
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
  page: number;
};

export type TMDBWatchProvider = {
  results: {
    [countryCode: string]: {
      flatrate?: { provider_name: string; logo_path: string }[];
      rent?: { provider_name: string; logo_path: string }[];
      buy?: { provider_name: string; logo_path: string }[];
    };
  };
};

export type Activity = {
  id: number;
  title: string;
  rated: number | null;
  tag: "Rated" | "Finished" | "Added" | "Dropped";
  date: string;
};

export type WatchlistStatus =
  | "WANT_TO_WATCH"
  | "WATCHING"
  | "WATCHED"
  | "DROPPED";
