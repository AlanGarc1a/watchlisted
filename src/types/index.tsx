export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  duration: number | null;
  rating: number | null;
  director: string;
  tags: string[] | undefined;
};
