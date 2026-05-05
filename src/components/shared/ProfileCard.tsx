type ProfileSize = "sm" | "md" | "lg";

type ProfileCardProps = {
  name: string;
  size?: ProfileSize;
};

const ProfileCard = ({ name, size }: ProfileCardProps) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return (
    <div
      className={`bg-violet/15 text-violet rounded-full font-bold text-lg flex items-center justify-center ${size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-12 h-12"}`}
    >
      {initials}
    </div>
  );
};

export default ProfileCard;
