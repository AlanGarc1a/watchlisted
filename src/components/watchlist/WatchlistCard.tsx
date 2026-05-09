import Image from "next/image";
import Link from "next/link";
import { Film } from "lucide-react";
import { getImageUrl } from "@/lib/tmdb";

const statusColors: Record<string, string> = {
  WATCHED: "bg-teal/15 text-teal border-teal/20",
  WATCHING: "bg-violet/15 text-violet border-violet/20",
  WANT_TO_WATCH: "bg-raised text-muted border-raised",
  DROPPED: "bg-brand/15 text-brand border-brand/20",
};

const statusLabels: Record<string, string> = {
  WATCHED: "Watched",
  WATCHING: "Watching",
  WANT_TO_WATCH: "Want to watch",
  DROPPED: "Dropped",
};

type WatchlistCardProps = {
  item: {
    id: string;
    status: string;
    rating: number | null;
    movie: {
      tmdbId: number;
      title: string;
      posterPath: string | null;
      genre: string | null;
    };
  };
};

const WatchlistCard = ({ item }: WatchlistCardProps) => {
  const type = item.movie.genre === "tv" ? "tv" : "movie";

  return (
    <Link href={`/media/${type}/${item.movie.tmdbId}`}>
      <div className="border border-raised rounded-xl overflow-hidden hover:border-violet/30 transition-colors cursor-pointer">
        {/* Poster */}
        <div className="relative w-full aspect-[2/3] bg-raised">
          {item.movie.posterPath ? (
            <Image
              src={getImageUrl(item.movie.posterPath)}
              alt={item.movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Film className="w-8 h-8 text-muted" />
            </div>
          )}

          {/* Rating badge */}
          {item.rating && (
            <div className="absolute top-2 right-2 bg-deep/80 text-gold text-xs font-semibold px-2 py-1 rounded-lg">
              {item.rating}/10
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="font-semibold text-xs text-primary truncate mb-2">
            {item.movie.title}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}
          >
            {statusLabels[item.status]}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistCard;
