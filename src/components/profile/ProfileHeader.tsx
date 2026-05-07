import ProfileCard from "../shared/ProfileCard";

type ProfileHeaderProps = {
  name: string | null;
  joinDate: string;
  following: number;
  followers: number;
};

const ProfileHeader = ({
  name,
  joinDate,
  following,
  followers,
}: ProfileHeaderProps) => {
  return (
    <div className="bg-deep border border-raised rounded-lg p-4 mb-4">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <ProfileCard name={name} />
          <div className="flex-1">
            <p className="font-bold text-lg">{name ?? "Anonymous"}</p>
            <p className="text-sm text-muted">{joinDate}</p>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col items-center">
              <p className="text-lg text-teal">{following}</p>
              <p className="text-muted text-xs">following</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg text-violet">{followers}</p>
              <p className="text-muted text-xs">followers</p>
            </div>
          </div>
        </div>
        <div className="bg-violet/15 border border-violet rounded-lg p-2 mt-4">
          <p className="text-violet text-xs tracking-widest">✦ Taste DNA</p>
          <p className="text-sm text-violet/70 pt-2">
            You gravitate toward morally grey protagonists and slow-burn
            tension. You abandon love triangles but secretly finish every
            documentary you start.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
