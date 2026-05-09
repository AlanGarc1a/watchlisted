import WatchlistClient from "@/components/watchlist/WatchlistClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const WatchlistPage = async () => {
  const session = await auth();
  const items = await prisma.watchlistItem.findMany({
    where: { userId: session?.user.id },
    include: { movie: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <p className="text-primary text-xl font-semibold mb-6">Watchlist</p>
      <WatchlistClient items={items} />
    </div>
  );
};

export default WatchlistPage;
