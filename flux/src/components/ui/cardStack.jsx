import React from "react";
import {
  Users,
  Cloud,
  Sparkles,
  LayoutTemplate,
  Terminal,
  RefreshCw,
  Check,
  Plus,
  Share2,
  X,
  ChevronUp,
  Folder,
  ChevronDown
} from "lucide-react";

// Injected global animation engines
const AnimationStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes moveAlice {
      0%, 100% { transform: translate(0px, 0px); }
      40% { transform: translate(-30px, -6px); }
      70% { transform: translate(-5px, 10px); }
    }
    @keyframes moveBob {
      0%, 100% { transform: translate(0px, 0px); }
      35% { transform: translate(-35px, 4px); }
      75% { transform: translate(-15px, -12px); }
    }
    @keyframes moveYou {
      0%, 100% { transform: translate(0px, 0px); }
      50% { transform: translate(25px, -15px); }
    }
    @keyframes floatCloud {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-alice-cursor { animation: moveAlice 9s ease-in-out infinite; }
    .animate-bob-cursor { animation: moveBob 8s ease-in-out infinite; }
    .animate-you-cursor { animation: moveYou 10s ease-in-out infinite; }
    .animate-float-cloud { animation: floatCloud 4s ease-in-out infinite; }
    .animate-terminal-blink { animation: blink 1s step-end infinite; }
  `}} />
);

const Card = ({ children, className = "" }) => (
  <div
    className={`group rounded-2xl border border-white/5 bg-[#0b0d0e] p-6 transition-all duration-300 hover:border-emerald-500/20 ${className}`}

  >
    {children}
  </div>
);

const IconBadge = ({ children }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-[#10b981] transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
    {children}
  </div>
);

const CardHeader = ({ icon, title, desc }) => (
  <div className="mb-5 flex items-start gap-4">
    <IconBadge>{icon}</IconBadge>
    <div>
      <h3 className="text-[16px] font-medium text-white transition-colors duration-300 group-hover:text-emerald-400">{title}</h3>
      <p className="mt-1 text-[13.5px] leading-normal text-zinc-400">{desc}</p>
    </div>
  </div>
);

function RealTimeCollaboration() {
  return (
    <Card>
      <CardHeader
        icon={<Users size={22} />}
        title="Real-Time Collaboration"
        desc="Collaborate live with instant sync and shared editing."
      />
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#07090a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#090b0c] px-4 py-2.5">
          <div className="flex items-center gap-2 text-[12px] text-zinc-400">
            <Folder size={13} className="text-zinc-500" />
            <span className="text-zinc-500">|</span>
            <span className="font-mono text-zinc-300">app/page.jsx</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="h-5 w-5 rounded-full border border-[#07090a] bg-emerald-500/30 overflow-hidden flex items-center justify-center text-[8px] text-emerald-300 font-bold">A</div>
              <div className="h-5 w-5 rounded-full border border-[#07090a] bg-sky-500/30 overflow-hidden flex items-center justify-center text-[8px] text-sky-300 font-bold">B</div>
              <div className="h-5 w-5 rounded-full border border-[#07090a] bg-purple-500/30 overflow-hidden flex items-center justify-center text-[8px] text-purple-300 font-bold">Y</div>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 block ml-0.5" />
          </div>
        </div>
        
        <div className="relative flex px-2 py-4 font-mono text-[12px] leading-relaxed select-none min-h-[220px]">
          <div className="w-8 shrink-0 text-right pr-3 text-zinc-700 space-y-0.5 select-none">
            {Array.from({ length: 8 }).map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          
          <div className="flex-1 text-zinc-400 space-y-0.5 relative">
            <div>
              <span className="text-[#c792ea]">export default function</span>{" "}
              <span className="text-[#82aaff]">Page</span>() {"{"}
            </div>
            <div className="pl-4"><span className="text-[#c792ea]">return</span> (</div>
            <div className="pl-8">
              <span className="text-zinc-600">&lt;</span><span className="text-[#ff557f]">div</span>{" "}
              <span className="text-[#c792ea]">className</span><span className="text-zinc-600">=</span><span className="text-[#ecc48d]">"p-8"</span><span className="text-zinc-600">&gt;</span>
            </div>
            <div className="pl-12">
              <span className="text-zinc-600">&lt;</span><span className="text-[#ff557f]">h1</span><span className="text-zinc-600">&gt;</span>Welcome to Flux<span className="text-zinc-600">&lt;/</span><span className="text-[#ff557f]">h1</span><span className="text-zinc-600">&gt;</span>
            </div>
            <div className="pl-12">
              <span className="text-zinc-600">&lt;</span><span className="text-[#ff557f]">p</span><span className="text-zinc-600">&gt;</span>Build together in real time.<span className="text-zinc-600">&lt;/</span><span className="text-[#ff557f]">p</span><span className="text-zinc-600">&gt;</span>
            </div>
            <div className="pl-8">
              <span className="text-zinc-600">&lt;/</span><span className="text-[#ff557f]">div</span><span className="text-zinc-600">&gt;</span>
            </div>
            <div className="pl-4">);</div>
            <div>{"}"}</div>

            {/* Alice (Green) */}
            <div className="animate-alice-cursor absolute top-[44px] right-[40px] z-30 flex items-start pointer-events-none">
              <svg className="w-4 h-4 text-[#10b981] drop-shadow-md shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M4.5 2.5v17.2l4.8-4.7 3.7 8.6 3.3-1.4-3.7-8.6 6-.6z"/>
              </svg>
              <span className="bg-[#10b981] text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ml-1 -mt-1 shadow-lg tracking-wide">
                Alice
              </span>
            </div>

            {/* Bob (Blue) */}
            <div className="animate-bob-cursor absolute top-[90px] right-[10px] z-30 flex items-start pointer-events-none">
              <svg className="w-4 h-4 text-[#0070f3] drop-shadow-md shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M4.5 2.5v17.2l4.8-4.7 3.7 8.6 3.3-1.4-3.7-8.6 6-.6z"/>
              </svg>
              <span className="bg-[#0070f3] text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ml-1 -mt-1 shadow-lg tracking-wide">
                Bob
              </span>
            </div>

            {/* You (Purple) */}
            <div className="animate-you-cursor absolute bottom-[15px] left-[70px] z-30 flex items-start pointer-events-none">
              <svg className="w-4 h-4 text-[#7928ca] drop-shadow-md shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M4.5 2.5v17.2l4.8-4.7 3.7 8.6 3.3-1.4-3.7-8.6 6-.6z"/>
              </svg>
              <span className="bg-[#7928ca] text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ml-1 -mt-1 shadow-lg tracking-wide">
                You
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-white/5 px-4 py-2.5 bg-[#080a0b]">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.05)]">
            <Check size={12} strokeWidth={2.5} /> Synced
          </span>
        </div>
      </div>
    </Card>
  );
}

function CloudIDE() {
  return (
    <Card>
      <CardHeader
        icon={<Cloud size={22} />}
        title="Cloud IDE"
        desc="Code from any browser with a cloud-powered IDE."
      />
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#07090a] shadow-2xl">
        
        {/* Window Top Bar Navbar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-[#090b0c] px-4 py-2.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-zinc-300 font-mono cursor-pointer hover:text-white">
              <span>flux-app</span>
              <ChevronDown size={12} className="text-zinc-500 mt-0.5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-white/5 bg-white/[0.02] text-zinc-400 cursor-pointer hover:text-white transition-colors">
              <Share2 size={11} />
            </div>
            <button className="rounded-md bg-[#0c2018] border border-emerald-500/20 px-3 py-0.5 text-[11.5px] font-medium text-[#27c93f] transition-all hover:bg-emerald-500/20">
              Share
            </button>
          </div>
        </div>

        {/* IDE Main Content Split Screen Layout */}
        <div className="relative flex min-h-[220px]">
          
          {/* Left Navigation Gutter Sidebar */}
          <div className="w-12 border-r border-white/5 bg-[#080a0b]/60 flex flex-col items-center py-4 gap-4 shrink-0">
            <div className="h-5 w-8 rounded border border-white/10 bg-white/[0.03] flex flex-col justify-center gap-0.5 px-1.5">
              <span className="h-px bg-zinc-400 w-full rounded-full" />
              <span className="h-px bg-zinc-400 w-2/3 rounded-full" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 w-full opacity-30">
                <div className="h-3.5 w-3.5 rounded-full border border-zinc-400" />
                <span className="h-px bg-zinc-500 w-3" />
              </div>
            ))}
          </div>

          {/* Clean Unified Canvas Viewport Area */}
          <div className="flex-1 bg-[#07090a] relative p-4 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Ambient Ambient Glow Field Layer */}
            <div className="absolute h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Central Cloud Node Container */}
            <div className="animate-float-cloud flex flex-col items-center justify-center z-10 relative">
              <div className="relative inline-block">
                <Cloud
                  size={52}
                  strokeWidth={1.5}
                  className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                />
                <div className="absolute inset-0 m-auto h-3.5 w-3.5 rounded-full bg-emerald-400 flex items-center justify-center shadow-md">
                  <Plus size={8} strokeWidth={4} className="text-black" />
                </div>
              </div>
              <div className="mt-3.5 text-center leading-relaxed">
                <span className="text-[13px] font-medium text-emerald-400 tracking-wide block">Always available.</span>
                <span className="text-[12px] text-emerald-500/70 block font-light">Anywhere.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
}

function AICodingAssistant() {
  return (
    <Card>
      <CardHeader
        icon={<Sparkles size={22} className="text-amber-400" />}
        title="AI Coding Assistant"
        desc="Generate, debug, and refactor code using AI."
      />
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#07090a] p-3">
        <div className="mb-3 flex items-start justify-end gap-2">
          <div className="max-w-[80%] rounded-xl rounded-tr-sm bg-zinc-800 px-3 py-2 text-[11.5px] text-zinc-200 shadow-md">
            Create a button component with loading state.
          </div>
          <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-sky-400 via-emerald-300 to-purple-400 animate-pulse" />
        </div>
        <div className="rounded-xl border border-white/5 bg-[#090b0c]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2 text-[11px] font-medium text-emerald-400">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} /> Flux AI
          </div>
          <div className="px-3 py-3 font-mono text-[11px] leading-relaxed text-zinc-400">
            <div><span className="text-purple-400">export function</span> <span className="text-sky-300">Button</span>() {"{"}</div>
            <div className="pl-3 text-zinc-600">&lt;<span className="text-emerald-400">button</span> <span className="text-amber-300">disabled</span>={"{loading}"}&gt;</div>
            <div className="pl-6">{"{loading ? 'Loading...' : children}"}</div>
            <div className="pl-3 text-zinc-600">&lt;/<span className="text-emerald-400">button</span>&gt;</div>
            <div>{"}"}</div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 px-3 py-2 bg-[#060809]">
            <span className="flex items-center gap-1 text-[11px] text-amber-300/90">
              <Sparkles size={11} className="animate-pulse" /> Suggested
            </span>
            <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-medium text-black cursor-pointer hover:bg-emerald-400 active:scale-95 transition-all">
              Accept
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StarterTemplates() {
  const items = [
    { 
      name: "Next.js", 
      active: true,
      logo: (
        <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 180 180">
          <path d="M90 0a90 90 0 1 0 90 90A90 90 0 0 0 90 0zm33.5 131.5L83.2 79.1V123H72V57h11.2l37.8 49V57h11V131.5z M104.2 57v40.3L86 71.5z" />
        </svg>
      )
    },
    { 
      name: "Vue", 
      logo: (
        <svg className="w-3.5 h-3.5 fill-current text-[#42b883]" viewBox="0 0 256 221">
          <path d="M204.8 0H256L128 220.8L0 0h51.2L128 132.4L204.8 0z" fill="#41B883"/>
          <path d="M174.4 0H204.8L128 132.4L51.2 0h30.4L128 92.1L174.4 0z" fill="#35495E"/>
        </svg>
      )
    },
    { 
      name: "Node.js", 
      logo: (
        <svg className="w-3.5 h-3.5 fill-current text-[#339933]" viewBox="0 0 256 293">
          <path d="M115.4 9.1L21.3 63.4c-9.5 5.5-15.4 15.6-15.4 26.6v108.7c0 11 5.9 21.1 15.4 26.6l94.1 54.3c9.5 5.5 21.3 5.5 30.8 0l94.1-54.3c9.5-5.5 15.4-15.6 15.4-26.6V90c0-11-5.9-21.1-15.4-26.6l-94.1-54.3c-9.5-5.5-21.3-5.5-30.8 0z" />
        </svg>
      )
    },
    { 
      name: "SvelteKit", 
      logo: (
        <svg className="w-3.5 h-3.5 fill-current text-[#ff3e00]" viewBox="0 0 256 314">
          <path d="M239.5 68.4l-75.3-43.5c-22.1-12.8-50-12.8-72.2 0L16.5 68.4C-5.5 81.1-5.5 106.8 16.5 119.6l39.1 22.6-39.1 22.6c-22 12.8-22 38.5 0 51.2l75.5 43.6c22.1 12.8 50 12.8 72.2 0l75.3-43.5c22.1-12.8 22.1-38.5 0-51.2l-39.1-22.6 39.1-22.6c22.1-12.8 22.1-38.5 0-51.3zm-68.9 122.3l-28.5 16.4V141l28.5-16.4v66.1z" />
        </svg>
      )
    },
  ];

  return (
    <Card>
      <CardHeader
        icon={<LayoutTemplate size={22} />}
        title="Starter Templates"
        desc="Start with templates for Next.js, Vue, and more."
      />
      {/* Container Layout Split Screen Architecture */}
      <div className="flex rounded-xl border border-white/5 bg-[#07090a] overflow-hidden min-h-[190px]">
        
        {/* LEFT COLUMN: Sidebar Navigation Tab Matrix */}
        <div className="w-[125px] border-r border-white/5 p-2 flex flex-col justify-between shrink-0 bg-[#080a0b]/40">
          <div className="space-y-1">
            {items.map((it) => (
              <div
                key={it.name}
                className={`group/item flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12.5px] font-sans transition-all duration-200 cursor-pointer relative ${
                  it.active 
                    ? "bg-[#0b1612] border border-emerald-500/20 text-white font-medium shadow-[0_0_12px_rgba(16,185,129,0.03)]" 
                    : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-md ${it.active ? 'bg-zinc-950/80 border border-white/10 shadow' : ''}`}>
                    {it.logo}
                  </div>
                  <span>{it.name}</span>
                </div>
                {/* Visual Active Node Accent Arrow */}
                {it.active && (
                  <span className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#0b1612] border-t border-r border-emerald-500/20 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom Custom Navigation Meta Link */}
          <div className="px-2.5 pb-1 flex items-center gap-2 text-[12px] font-sans text-zinc-500 hover:text-zinc-400 cursor-pointer transition-colors">
            <span>•••</span>
            <span>More</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Framework Visual Preview Window Box */}
        <div className="flex-1 p-4 bg-[#07090a] flex flex-col justify-between items-center relative">
          
          {/* Internal Showcase Display Slate */}
          <div className="w-full flex-1 rounded-lg border border-white/[0.04] bg-white/[0.01] p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/[0.02] blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3">
              {/* Stylized Framework Circle Container */}
              <div className="h-11 w-11 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center shadow-inner shrink-0">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 180 180">
                  <path d="M90 0a90 90 0 1 0 90 90A90 90 0 0 0 90 0zm33.5 131.5L83.2 79.1V123H72V57h11.2l37.8 49V57h11V131.5z M104.2 57v40.3L86 71.5z" />
                </svg>
              </div>
              <div className="leading-tight">
                <h4 className="text-[14px] font-medium text-white tracking-wide">Next.js</h4>
                <p className="text-[10.5px] text-zinc-400 mt-0.5 max-w-[130px] font-sans">The React Framework for Production</p>
              </div>
            </div>

            {/* Split Style CTA Interaction Node */}
            <div className="mt-3 flex w-full rounded-md overflow-hidden border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/15 transition-all shadow-md group/btn cursor-pointer">
              <span className="flex-1 py-1.5 text-center text-[11px] font-medium text-emerald-400 select-none tracking-wide">
                Use Template
              </span>
              <span className="w-7 border-l border-emerald-500/20 flex items-center justify-center text-emerald-400 bg-emerald-500/5 group-hover/btn:bg-emerald-500/10 transition-colors">
                <span className="transform group-hover/btn:translate-x-0.5 transition-transform">→</span>
              </span>
            </div>
          </div>

          {/* Lower Dynamic Matrix Navigation Slider Indicators */}
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  i === 0 ? "bg-white scale-110" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </Card>
  );
}

function IntegratedTerminal() {
  return (
    <Card>
      <CardHeader
        icon={<Terminal size={22} />}
        title="Integrated Terminal"
        desc="Execute runtime shells without switching context tabs."
      />
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#07090a]">
        <div className="flex items-center justify-between border-b border-white/5 bg-[#090b0c] px-3 py-2 text-[10.5px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-zinc-200 border-b border-emerald-400/60 pb-0.5 font-mono">SH</span>
            <span>PROBLEMS</span>
            <span className="rounded bg-zinc-800 px-1 text-[9px] text-zinc-400">0</span>
          </div>
          <div className="flex items-center gap-2">
            <Plus size={11} />
            <X size={11} />
          </div>
        </div>
        <div className="px-3 py-3 font-mono text-[11px] leading-relaxed text-zinc-400 min-h-[105px]">
          <div><span className="text-emerald-400">$</span> npm run dev</div>
          <div className="text-zinc-600">&gt; next dev</div>
          <div className="mt-1 flex items-center gap-1 text-emerald-500">
            <span>▲</span> Next.js Ready
          </div>
          <div className="text-zinc-600 pl-3">- Local: <span className="text-sky-400 underline decoration-sky-400/20">http://localhost:3000</span></div>
          <div className="mt-0.5 text-emerald-400 flex items-center gap-1">
            <span>✓ Active compiled</span>
            <span className="animate-terminal-blink h-3.5 w-1.5 bg-emerald-400 inline-block align-middle" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function OfflineSync() {
  return (
    <Card>
      <CardHeader
        icon={<RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-700" />}
        title="Offline Sync"
        desc="Keep typing offline; sync operations schedule automatically."
      />
      <div className="flex gap-3">
        <div className="flex-1 overflow-hidden rounded-xl border border-white/5 bg-[#07090a]">
          <div className="flex items-center justify-between border-b border-white/5 bg-[#090b0c] px-3 py-1.5">
            <span className="text-[11px] text-zinc-400 font-mono">db.js</span>
            <span className="flex items-center gap-1 text-[10px] text-amber-400">
              <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '3s' }} /> Pipeline
            </span>
          </div>
          <div className="px-3 py-3 font-mono text-[10.5px] leading-relaxed text-zinc-500">
            <div><span className="text-purple-400/80">const</span> sync = () ={'>'} {"{"}</div>
            <div className="pl-3">localCache.flush()</div>
            <div>{"}"}</div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 px-3 py-1.5 bg-[#060809]">
            <span className="text-[10.5px] text-zinc-500">3 structural changes</span>
          </div>
        </div>
        <div className="flex w-12 shrink-0 flex-col items-center justify-between py-1">
          <span className="text-[9px] text-zinc-500 uppercase tracking-wider">State</span>
          <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" style={{ animationDuration: '2.5s' }} />
            <span className="h-6 w-px bg-zinc-800" />
            <Cloud size={14} className="text-zinc-700" />
          </div>
          <span className="text-center text-[9px] leading-tight text-zinc-400 font-medium">Auto</span>
        </div>
      </div>
    </Card>
  );
}

export default function PowerfulFeatures() {
  return (
    <div className="relative min-h-screen overflow-hidden  px-6 py-20">
      <AnimationStyles />
      
      {/* Decorative Background Effects */}
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