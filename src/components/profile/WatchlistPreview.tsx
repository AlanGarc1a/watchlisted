import Link from "next/link";
import WatchlistCard from "../watchlist/WatchlistCard";
import { WatchlistItem } from "@/types";

export type WatchlistPreviewProps = {
  items: WatchlistItem[];
};

const WatchlistPreview = async ({ items }: WatchlistPreviewProps) => {
  return (
    <div className="bg-deep border border-raised p-4 mt-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-primary font-semibold">My watchlist</p>
        <Link
          href="/watchlist"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          See all
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-sm">Your watchlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => {
            return <WatchlistCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default WatchlistPreview;
