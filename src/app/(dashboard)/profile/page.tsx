import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import GenreBreakdown from "@/components/profile/GenreBreakdown";
import ActivityFeed from "@/components/profile/ActivityFeed";
import WatchlistPreview from "@/components/profile/WatchlistPreview";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const userId = session.user.id;

  const [watchlistItems, activities, followStats] = await Promise.all([
    prisma.watchlistItem.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { updatedAt: "desc" },
    }),

    prisma.activity.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),

    Promise.all([
      prisma.follow.count({ where: { followerId: userId } }),
      prisma.follow.count({ where: { followingId: userId } }),
    ]),
  ]);

  const [following, followers] = followStats;

  const watched = watchlistItems.filter((i) => i.status === "WATCHED");
  const ratings = watchlistItems
    .filter((i) => i.rating !== null)
    .map((i) => i.rating as number);
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : 0;
  const completionRate =
    watchlistItems.length > 0
      ? Math.round((watched.length / watchlistItems.length) * 100)
      : 0;

  const hoursWatched = Math.round(
    watched.reduce((total, item) => total + (item.movie.runtime ?? 0), 0) / 60,
  );

  const previewItems = watchlistItems.slice(0, 4);

  return (
    <>
      <h1 className="text-xl font-semibold text-primary mb-4">My profile</h1>
      <ProfileHeader
        name={session.user.name ?? null}
        joinDate="Jan 2024"
        following={following}
        followers={followers}
      />
      <ProfileStats
        titlesWatched={watched.length}
        timeWatched={hoursWatched}
        avgRating={avgRating}
        completionRate={completionRate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <GenreBreakdown items={watchlistItems} />
        <ActivityFeed activities={activities} />
      </div>
      <WatchlistPreview items={previewItems} />
    </>
  );
};

export default ProfilePage;
