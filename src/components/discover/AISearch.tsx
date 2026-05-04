import { Search } from "lucide-react";

const AISearch = () => {
  return (
    <div className="rounded-xl bg-raised p-2 flex items-center gap-2 border border-muted">
      <div className="flex items-center justify-center">
        <Search className="w-4 h-4 text-muted flex-shrink-0" />
      </div>
      <input
        type="text"
        className="bg-transparent placeholder:text-muted text-primary flex-1 px-2 py-1 text-sm focus:outline-none"
        placeholder="Try a thriller under 2 hours, not too dark..."
      />
      <button className="rounded-full border border-violet/30 px-3 py-1 bg-violet/15 text-violet hover:bg-violet/20 text-xs font-medium">
        ✦ AI search
      </button>
    </div>
  );
};

export default AISearch;
