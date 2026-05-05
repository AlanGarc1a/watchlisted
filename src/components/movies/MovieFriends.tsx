const friends = [
  {
    initials: "SK",
    name: "Sara K.",
    review: "One of the best films of the decade.",
    score: "10/10",
    bgColor: "bg-teal/15",
    textColor: "text-teal",
  },
  {
    initials: "MR",
    name: "Marcus R.",
    review: "Great but the courtroom stuff dragged.",
    score: "7/10",
    bgColor: "bg-gold/15",
    textColor: "text-gold",
  },
  {
    initials: "AL",
    name: "Alex L.",
    review: "Murphy is incredible in this!",
    score: "9/10",
    bgColor: "bg-violet/15",
    textColor: "text-violet",
  },
];

const MovieFriends = () => {
  return (
    <div className="bg-deep border border-raised rounded-xl p-6 mb-6">
      <p className="text-primary font-semibold text-sm">
        Friends who watched this
      </p>
      <div className="flex flex-col gap-4">
        {friends.map((friend) => (
          <div
            key={friend.initials}
            className="flex gap-3 items-center py-3 border-b border-raised last:border-b-0"
          >
            <div
              className={`${friend.bgColor} ${friend.textColor} rounded-full w-8 h-8 flex items-center justify-center text-xs font-semibold flex-shrink-0`}
            >
              {friend.initials}
            </div>
            <div className="flex-1">
              <span className="block text-sm text-primary">{friend.name}</span>
              <p className="text-muted text-xs">{friend.review}</p>
            </div>
            <span className="text-gold text-sm font-semibold">
              {friend.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieFriends;
