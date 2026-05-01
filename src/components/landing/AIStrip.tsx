const AIStrip = () => {
  return (
    <div className="border border-raised bg-deep rounded-xl p-4 mt-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-3">
          <p className="uppercase text-muted text-sm font-semibold tracking-widest">
            powered by claude ai
          </p>
          <h3 className="text-primary text-lg font-bold">
            An AI that actually knows your taste
          </h3>
          <p className="text-xs text-muted">
            Not just &quot;you watched action, here&apos;s action.&quot;
            Watchlisted understands nuance — pacing, tone, your quirks — and
            gives recs that feel human.
          </p>
          <ul className="text-muted space-y-2">
            <li className="text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0" />
              Natural language search — describe a vibe, not a title
            </li>
            <li className="text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0" />
              Tonight&apos;s Pick — one perfect recommendation, every day
            </li>
            <li className="text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0" />
              Taste DNA — a witty AI portrait of your personality
            </li>
            <li className="text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0" />
              Should I keep watching? — honest, personalized advice
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-muted text-xs text-left mb-2">You</p>
          <div className="bg-muted/15 rounded-lg p-3 max-w-64">
            <p className="text-primary">
              &quot;Something like Succession but funnier and shorter&quot;
            </p>
          </div>
          <p className="text-violet text-xs text-right my-2">
            ✦ Watchlisted AI
          </p>
          <div className="rounded-lg p-3 bg-violet/15 max-w-64 ml-auto">
            <p className="text-violet font-semibold">
              Try The Bear — same pressure-cooker tension, darkly funny, under
              40 min episodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStrip;
