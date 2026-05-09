"use client";
import { useState } from "react";
import { X, Sparkles } from "lucide-react";

const examples = [
  "a slow burn thriller with a twist ending",
  "something like Succession but funnier",
  "a comfort show I can watch while eating",
  "a sci-fi movie that makes you think",
];

const AISearchBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-violet/10 border border-violet/20 rounded-xl p-4 mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-violet" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-1">
              ✦ AI search — describe what you want
            </p>
            <p className="text-xs text-muted mb-3">
              Instead of searching by title describe the vibe, mood, or feeling
              you want. Claude will find the perfect matches.
            </p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <span
                  key={example}
                  className="text-xs px-2 py-1 rounded-lg bg-violet/15 text-violet border border-violet/20 cursor-default"
                >
                  &ldquo;{example}&rdquo;
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted hover:text-primary transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AISearchBanner;
