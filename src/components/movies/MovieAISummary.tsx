import { Movie } from "@/types";

type MovieAISUmmaryProps = {
  movie?: Movie;
};

const MovieAISummary = ({ movie }: MovieAISUmmaryProps) => {
  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
      <div>
        <p className="text-violet uppercase text-xs tracking-widest font-medium mb-2">
          ✦ AI summary
        </p>
        <p className="text-muted">
          A technically astonishing portrait of Oppenheimer. Critics praised
          Cillian Murphy's career-best performance and Nolan's non-linear
          structure, though some found the courtroom sequences overlong.
          Audiences agree — the Trinity sequence alone is worth the runtime.
          Best in IMAX if you can.
        </p>
      </div>
    </div>
  );
};

export default MovieAISummary;
