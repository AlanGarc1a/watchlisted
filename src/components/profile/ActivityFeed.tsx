import { Activity } from "@/types";
type ActivityFeedProps = {
  activities: Activity[];
};
const tagColors: Record<string, string> = {
  Rated: "bg-gold",
  Finished: "bg-teal",
  Added: "bg-violet",
  Dropped: "bg-brand",
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="border border-raised bg-deep rounded-lg p-4">
      <p className="text-primary font-semibold text-sm">Recent activity</p>
      <ul className="flex flex-col">
        {activities.map((activity) => {
          return (
            <li
              key={activity.id}
              className="flex items-start gap-3 py-3 border-b border-raised last:border-b-0"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${tagColors[activity.tag] ?? "bg-muted"}`}
              />
              <div className="flex-1">
                <p className="text-sm text-muted">
                  {activity.tag}{" "}
                  <span className="font-semibold text-primary">
                    {activity.title}
                  </span>
                  {activity.rated !== null && (
                    <span className="text-gold ml-1">{activity.rated}/10</span>
                  )}
                </p>
                <p className="text-xs text-muted mt-0.5">{activity.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
