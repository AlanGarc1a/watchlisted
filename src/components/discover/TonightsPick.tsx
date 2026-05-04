import { Sparkles } from "lucide-react";

const TonightsPick = () => {
  return (
    <div className="my-4 p-4 bg-raised border border-raised rounded-xl">
      <div className="flex justify-between items-center justify-between cursor-pointer">
        <div className="rounded-lg flex items-center gap-4">
          <div className="rounded-lg w-8 h-8 flex items-center justify-center bg-violet/30">
            <Sparkles className="w-4 h-4 text-violet" />
          </div>
          <div>
            <p className="text-violet text-sm">✦ Tonight's pick</p>
            <p className="text-base text-primary font-semibold">
              The Grand Budapest Hotel
            </p>
            <span className="text-muted text-sm">
              Friday night · 99 min · you loved Moonrise Kingdom · 8.2
            </span>
          </div>
        </div>
        <button className="px-4 py-2 border border-muted rounded-xl text-xs bg-deep">
          + Add to list
        </button>
      </div>
    </div>
  );
};

export default TonightsPick;
