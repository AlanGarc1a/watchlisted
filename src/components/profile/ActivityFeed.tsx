import { Activity, Movie } from "@/generated/prisma";

type ActivityWithMovie = Activity & {
  movie: Movie | null;
};

type ActivityFeedProps = {
  activities: ActivityWithMovie[];
};

const tagColors: Record<string, string> = {
  RATED: "bg-gold",
  WATCHED: "bg-teal",
  ADDED: "bg-violet",
  DROPPED: "bg-brand",
  REVIEWED: "bg-rose",
};

const tagLabels: Record<string, string> = {
  RATED: "Rated",
  WATCHED: "Watched",
  ADDED: "Added to list",
  DROPPED: "Dropped",
  REVIEWED: "Reviewed",
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="border border-raised bg-deep rounded-lg p-4">
      <p className="text-primary font-semibold text-sm mb-3">Recent activity</p>

      {activities.length === 0 && (
        <p className="text-muted text-xs text-center py-8">
          No activity yet. Start watching something!
        </p>
      )}

      <ul className="flex flex-col">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3 py-3 border-b border-raised last:border-b-0"
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${tagColors[activity.type] ?? "bg-muted"}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted">
                <span className="text-muted text-xs">
                  {tagLabels[activity.type]}
                </span>{" "}
                <span className="font-semibold text-primary truncate">
                  {activity.movie?.title ?? "Unknown title"}
                </span>
                {activity.rating && (
                  <span className="text-gold ml-1">{activity.rating}/10</span>
                )}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {formatDate(activity.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default ActivityFeed;
