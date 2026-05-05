import { Movie } from "@/types";

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
