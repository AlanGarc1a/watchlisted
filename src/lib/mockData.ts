import type { Movie, Activity } from "@/types";
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    genre: "Sci-fi",
    duration: 166,
    rating: 8.5,
    tags: ["Sci-fi", "Adventure", "Action"],
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    genre: "Drama",
    duration: 181,
    rating: 8.5,
    tags: ["Drama", "Biography", "History"],
  },
  {
    id: 3,
    title: "Shogun",
    year: 2024,
    director: "Justin Chadwick",
    genre: "TV Drama",
    duration: null,
    rating: 9.0,
    tags: ["TV Drama", "Adventure", "History"],
  },
  {
    id: 4,
    title: "Past lives",
    year: 2023,
    director: "Cho Yoon-jin",
    genre: "Romance",
    duration: 106,
    rating: 7.9,
    tags: ["Romance", "Drama"],
  },
];

export const mockActivities: Activity[] = [
  { id: 1, title: "Oppenheimer", rated: 9, tag: "Rated", date: "2 hours ago" },
  { id: 2, title: "Shogun", rated: null, tag: "Finished", date: "Yesterday" },
  {
    id: 3,
    title: "Dune: Part Two",
    rated: null,
    tag: "Added",
    date: "3 days ago",
  },
  {
    id: 4,
    title: "Rings of Power",
    rated: null,
    tag: "Dropped",
    date: "1 week ago",
  },
];
