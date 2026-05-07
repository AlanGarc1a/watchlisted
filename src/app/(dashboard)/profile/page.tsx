import ActivityFeed from "@/components/profile/ActivityFeed";
import GenreBreakdown from "@/components/profile/GenreBreakdown";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import WatchlistPreview from "@/components/profile/WatchlistPreview";
import { mockActivities } from "@/lib/mockData";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <>
      <h1 className="text-xl font-semibold text-primary mb-4">My Profile</h1>
      <ProfileHeader
        name={session.user.name ?? "Anonymous"}
        joinDate="Jan 2024"
        following={48}
        followers={112}
      />
      <ProfileStats
        titlesWatched={342}
        timeWatched={847}
        avgRating={7.4}
        completionRate={78}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <GenreBreakdown />
        <ActivityFeed activities={mockActivities} />
      </div>
      <WatchlistPreview />
    </>
  );
};

export default ProfilePage;
