type ProfileStatsProp = {
  titlesWatched: number;
  timeWatched: number;
  avgRating: number;
  completionRate: number;
};

const ProfileStats = ({
  titlesWatched,
  timeWatched,
  avgRating,
  completionRate,
}: ProfileStatsProp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-deep border border-raised rounded-lg p-4">
        <div className="flex flex-col">
          <p className="text-brand font-semibold text-xl">{titlesWatched}</p>
          <p className="text-xs text-muted">titles watched</p>
        </div>
      </div>
      <div className="bg-deep border-raised rounded-lg p-4">
        <div className="flex flex-col">
          <p className="text-gold font-semibold text-xl">{timeWatched}h</p>
          <p className="text-xs text-muted">time watched</p>
        </div>
      </div>
      <div className="bg-deep border-raised rounded-lg p-4">
        <div className="flex flex-col">
          <p className="text-teal font-semibold text-xl">{avgRating}</p>
          <p className="text-xs text-muted">avg rating</p>
        </div>
      </div>
      <div className="bg-deep border-raised rounded-lg p-4">
        <div className="flex flex-col">
          <p className="text-brand font-semibold text-xl">{completionRate}%</p>
          <p className="text-xs text-muted">completion rate</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
