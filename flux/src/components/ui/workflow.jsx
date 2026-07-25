export default function heroText() {
  return (
    <div className="relative min-h-screen overflow-hidden  px-6 py-20">
      <AnimationStyles />
      

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-12 top-12 h-1 w-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute left-1/4 top-1/3 h-1 w-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute right-1/4 top-16 h-1 w-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Powerful <span className="text-emerald-400 font-medium">Features</span>
        </h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-md mx-auto leading-relaxed">
          Everything you need to build, collaborate, and ship high-performance code architecture faster.
        </p>
        <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <RealTimeCollaboration />
        <CloudIDE />
        <AICodingAssistant />
        <StarterTemplates />
        <IntegratedTerminal />
        <OfflineSync />
      </div>
    </div>
  );
}