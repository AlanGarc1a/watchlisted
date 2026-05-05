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

export type Activity = {
  id: number;
  title: string;
  rated: number | null;
  tag: "Rated" | "Finished" | "Added" | "Dropped";
  date: string;
};
