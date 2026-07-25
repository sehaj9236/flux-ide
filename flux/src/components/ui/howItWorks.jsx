'use client'
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Cloud, 
  Users, 
  Terminal as TerminalIcon, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Circle,
  Play,
  RotateCcw,
  UserPlus,
  Layers,
  Sparkles,
  Laptop
} from 'lucide-react';

// 100% Accurate brand SVG icons for the developers templates
const NextjsIcon = () => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="white"/>
    </mask>
    <g mask="url(#next-mask)">
      <circle cx="90" cy="90" r="90" fill="black"/>
      <path d="M149.508 157.52L69.142 54H54v72h14.4V78.37l67.54 87.05c4.78-2.47 9.27-5.45 13.568-8.9z" fill="url(#next-grad-1)"/>
      <rect x="115" y="54" width="14" height="72" fill="url(#next-grad-2)"/>
    </g>
    <defs>
      <linearGradient id="next-grad-1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="next-grad-2" x1="122" y1="54" x2="122" y2="126" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const VueIcon = () => (
  <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M204.8 0H256L128 220.8L0 0h51.2L128 132.48L204.8 0z" fill="#41B883"/>
    <path d="M165.12 0H204.8L128 132.48L51.2 0h39.68L128 65.28L165.12 0z" fill="#35495E"/>
  </svg>
);

export default function OnboardingWorkflow() {
  const [selectedTemplate, setSelectedTemplate] = useState('Next.js');
  
  // Workspace Launching States
  const [progress, setProgress] = useState(87);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchComplete, setLaunchComplete] = useState(true);

  // Collaborator States
  const [collaborators, setCollaborators] = useState([
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Editor', online: true, color: 'bg-emerald-500/20 text-emerald-400' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', online: true, color: 'bg-blue-500/20 text-blue-400' },
    { name: 'Charlie Lee', email: 'charlie@example.com', role: 'Viewer', online: false, color: 'bg-purple-500/20 text-purple-400' },
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer'); // Changed default to 'Viewer' as requested

  // Build Together States
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState([
    { text: '$ npm run dev', type: 'cmd' },
    { text: '- Local: http://localhost:3000', type: 'info' },
    { text: '✓ Ready in 1.2s', type: 'success' }
  ]);

  // Handle mock workspace launching sequences with a maximum cap at 100%
  useEffect(() => {
    let interval;
    if (isLaunching) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLaunching(false);
            setLaunchComplete(true);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 15) + 5;
          if (next >= 100) {
            clearInterval(interval);
            setIsLaunching(false);
            setLaunchComplete(true);
            return 100;
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isLaunching]);

  const triggerLaunch = () => {
    setProgress(0);
    setIsLaunching(true);
    setLaunchComplete(false);
  };

  // Add real-time interactive user invitations
  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    const namePart = inviteEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[^a-zA-Z]/g, ' ');
    
    const colors = [
      'bg-pink-500/20 text-pink-400',
      'bg-indigo-500/20 text-indigo-400',
      'bg-amber-500/20 text-amber-400',
      'bg-teal-500/20 text-teal-400'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCollaborator = {
      name: formattedName || 'Guest User',
      email: inviteEmail,
      role: inviteRole,
      online: true,
      color: randomColor
    };

    setCollaborators([newCollaborator, ...collaborators]);
    setInviteEmail('');
  };

  // Run build toolchain compiler simulation
  const triggerBuild = () => {
    setIsBuilding(true);
    setBuildLogs([
      { text: `$ npm run build`, type: 'cmd' },
      { text: 'creating an optimized production build...', type: 'info' }
    ]);

    setTimeout(() => {
      setBuildLogs(prev => [
        ...prev,
        { text: '✓ compiled successfully', type: 'success' },
        { text: 'File sizes:', type: 'info' },
        { text: '  ├  /index.html (320 B)', type: 'info' },
        { text: '  └  /static/js/main.js (124 KB)', type: 'info' }
      ]);
      setIsBuilding(false);
    }, 1200);
  };

  // Mapping actual high fidelity SVGs to templates array (Node.js has been removed)
  const templates = [
    { id: 'Next.js', name: 'Next.js', iconComponent: <NextjsIcon />, desc: 'React framework' },
    { id: 'React', name: 'React', iconComponent: <ReactIcon />, desc: 'Single-page app' },
    { id: 'Vue', name: 'Vue.js', iconComponent: <VueIcon />, desc: 'Progressive framework' },
  ];

  return (
    <div className="min-h-screen text-slate-300 font-sans p-4 md:p-8 flex flex-col items-center justify-start  selection:bg-emerald-500/30 selection:text-emerald-400 overflow-x-hidden">
      
      {/* Top Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mt-12 mb-14 max-w-2xl relative z-10">
  
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Get started in <span className="text-emerald-400 font-extrabold drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">minutes</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto">
          From selecting a template to collaborating in real time. Try out and interact with each setup card!
        </p>
        
        {/* Subtle Decorative Flow Line */}
        <div className="mt-6 flex items-center justify-center gap-1">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-emerald-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-emerald-500/40" />
        </div>
      </div>

      {/* Main Grid: Standardized heights (exactly 260px) to guarantee flawless visual grid lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full relative z-10 px-2">
        
        {/* --- STEP 1: SELECT TEMPLATE --- */}
        <div className="relative group flex flex-col">
          <div className="bg-[#0B0D0E]/90 border border-slate-800/80 rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl border border-slate-800 bg-[#0f192e] flex items-center justify-center text-emerald-400 shadow-inner">
                <LayoutGrid size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-slate-500">Step 1</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 text-left">Select Template</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed text-left min-h-[32px]">
              Choose from production-ready frameworks with official source templates.
            </p>

            {/* Simulated UI Panel: Standardized Height h-[260px] */}
            <div className="w-full bg-[#07090A] border border-slate-800/60 rounded-2xl p-3.5 text-left flex flex-col justify-between h-[260px] mt-auto">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-2.5">
                  Popular Templates
                </span>
                
                <div className="space-y-1.5">
                  {templates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all border text-xs ${
                        selectedTemplate === tmpl.id
                          ? 'bg-[#0f2423] border-emerald-500/30 text-emerald-400 font-medium'
                          : 'bg-slate-950/40 border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold border ${
                          selectedTemplate === tmpl.id 
                            ? 'bg-emerald-500/5 border-emerald-500/20' 
                            : 'bg-slate-900 border-slate-800/60'
                        }`}>
                          {tmpl.iconComponent}
                        </span>
                        <div className="text-left">
                          <p className="font-semibold leading-none mb-0.5">{tmpl.name}</p>
                          <p className="text-[9px] text-slate-500 leading-none">{tmpl.desc}</p>
                        </div>
                      </div>
                      {selectedTemplate === tmpl.id && <Check size={14} className="text-emerald-400 mr-1" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-medium hover:text-slate-200 cursor-pointer transition-colors">
                <span>View templates</span>
              </div>
            </div>
          </div>
          
          {/* Connecting Arrow for Large Screens */}
          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050607] border border-slate-800/80 items-center justify-center text-emerald-500/60 shadow-lg">
            <ArrowRight size={14} />
          </div>
        </div>

        {/* --- STEP 2: LAUNCH WORKSPACE --- */}
        <div className="relative group flex flex-col">
          <div className="bg-[#0B0D0E]/90 border border-slate-800/80 rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl border border-slate-800 bg-[#0f192e] flex items-center justify-center text-emerald-400 shadow-inner">
                <Cloud size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-slate-500">Step 2</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 text-left">Launch Workspace</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed text-left min-h-[32px]">
              Spin up sandboxed dev servers in seconds directly inside the browser.
            </p>

            {/* Simulated UI Panel: Standardized Height h-[260px] */}
            <div className="w-full bg-[#07090A] border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center justify-between h-[260px] mt-auto relative overflow-hidden">
              
              {/* Top Bar Decoration */}
              <div className="w-full flex items-center justify-between border-b border-slate-900/60 pb-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[9px] font-mono text-slate-600">cloud_core_v2</span>
              </div>

              {/* Central Status Icon */}
              <div className="my-auto flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <Cloud 
                    size={40} 
                    className={`text-emerald-400 mb-2 transition-all ${isLaunching ? 'animate-bounce' : 'opacity-90'}`} 
                  />
                  {isLaunching && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                
                <p className="text-[11px] font-medium text-slate-300 text-center">
                  {isLaunching ? 'Launching secure container...' : launchComplete ? 'Workspace online & secured' : 'Container is paused'}
                </p>
                <span className="text-[10px] text-slate-500 mt-1">
                  Using: <span className="text-emerald-500/80 font-mono">{selectedTemplate}</span> setup
                </span>
              </div>

              {/* Progress and Actions */}
              <div className="w-full space-y-2">
                <div className="w-full bg-slate-900 border border-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-mono">Progress: {progress}%</span>
                  <button 
                    onClick={triggerLaunch}
                    disabled={isLaunching}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-emerald-400 transition-colors disabled:opacity-50"
                  >
                    <RotateCcw size={10} />
                    <span>Re-launch</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050607] border border-slate-800/80 items-center justify-center text-emerald-500/60 shadow-lg">
            <ArrowRight size={14} />
          </div>
        </div>

        {/* --- STEP 3: INVITE COLLABORATORS --- */}
        <div className="relative group flex flex-col">
          <div className="bg-[#0B0D0E]/90 border border-slate-800/80 rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl border border-slate-800 bg-[#0f192e] flex items-center justify-center text-emerald-400 shadow-inner">
                <Users size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-slate-500">Step 3</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 text-left">Invite Team</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed text-left min-h-[32px]">
              Share link with live multi-cursor syncing for real-time multiplayer code sessions.
            </p>

            {/* Simulated UI Panel: Standardized Height h-[260px] */}
            <div className="w-full bg-[#07090A] border border-slate-800/60 rounded-2xl p-3 flex flex-col justify-between h-[260px] mt-auto">
              
              <form onSubmit={handleInvite} className="space-y-1.5">
                <div className="flex gap-1.5">
                  <input 
                    type="email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@email.com" 
                    className="w-full bg-slate-950 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="bg-slate-950 border border-slate-800/80 rounded-lg px-1.5 text-[11px] text-slate-400 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <UserPlus size={11} />
                  <span>Send Invite</span>
                </button>
              </form>

              {/* Members List Container - Scrollable internal element to fit size perfectly */}
              <div className="flex-1 mt-2.5 overflow-y-auto pr-0.5 space-y-2 max-h-[130px] custom-scrollbar">
                <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase block">
                  Active in session ({collaborators.length})
                </span>
                
                <div className="space-y-1.5">
                  {collaborators.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950/30 p-1.5 rounded-lg border border-slate-900/60">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border border-slate-800 ${user.color}`}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="truncate max-w-[90px]">
                          <p className="text-[10px] font-semibold text-slate-300 leading-none truncate">{user.name}</p>
                          <p className="text-[8px] text-slate-500 leading-none truncate mt-0.5">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 bg-slate-900 border border-slate-800/60 px-1 py-0.5 rounded leading-none">{user.role}</span>
                        <Circle size={5} className={`fill-current ${user.online ? 'text-emerald-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050607] border border-slate-800/80 items-center justify-center text-emerald-500/60 shadow-lg">
            <ArrowRight size={14} />
          </div>
        </div>

        {/* --- STEP 4: BUILD TOGETHER --- */}
        <div className="relative group flex flex-col">
          <div className="bg-[#0B0D0E]/90 border border-slate-800/80 rounded-3xl p-6 flex flex-col h-full transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl border border-slate-800 bg-[#0f192e] flex items-center justify-center text-emerald-400 shadow-inner">
                <TerminalIcon size={20} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-slate-500">Step 4</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1 text-left">Deploy App</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed text-left min-h-[32px]">
              Ship production ready pipelines. Compile source code and get a public live url instantly.
            </p>

            {/* Simulated UI Panel: Standardized Height h-[260px] */}
            <div className="w-full bg-[#07090A] border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col justify-between h-[260px] mt-auto">
              
              {/* Mock Code Editor Tab */}
              <div className="bg-[#0B0D0E] px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-amber-500/80 font-bold">TSX</span>
                  <span>app/page.tsx</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>

              {/* Code Blocks */}
              <div className="p-2.5 font-mono text-[9px] space-y-0.5 leading-tight bg-[#07090A] flex-1 overflow-y-auto custom-scrollbar">
                <div><span className="text-purple-400">export default function</span> <span className="text-blue-400">Page</span>() &#123;</div>
                <div className="pl-2.5"><span className="text-purple-400">return</span> (</div>
                <div className="pl-5 text-slate-500">&lt;<span className="text-rose-400">div</span> <span className="text-amber-400">className</span>=<span className="text-emerald-400">"grid"</span>&gt;</div>
                <div className="pl-7.5 text-slate-400">&lt;<span className="text-rose-400">h1</span>&gt;Dynamic: <span className="text-emerald-400">{selectedTemplate}</span>&lt;/<span className="text-rose-400">h1</span>&gt;</div>
                <div className="pl-5 text-slate-500">&lt;/<span className="text-rose-400">div</span>&gt;</div>
                <div className="pl-2.5">);</div>
                <div>&#125;</div>
              </div>

              {/* Mock Terminal Section with custom action */}
              <div className="border-t border-slate-800/65 bg-[#050607] p-2.5 font-mono text-[9px] space-y-1">
                <div className="flex items-center justify-between text-[8px] text-slate-500 uppercase tracking-wider font-bold mb-1">
                  <span>Terminal Console</span>
                  <button 
                    onClick={triggerBuild}
                    disabled={isBuilding}
                    className="flex items-center gap-1 text-[8px] text-emerald-400 font-bold hover:text-emerald-300 uppercase bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded transition-colors disabled:opacity-50"
                  >
                    <Play size={8} />
                    <span>{isBuilding ? 'Running...' : 'Run Build'}</span>
                  </button>
                </div>
                
                <div className="max-h-[50px] overflow-y-auto space-y-0.5 custom-scrollbar text-slate-400">
                  {buildLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={
                        log.type === 'cmd' ? 'text-slate-300 font-bold' : 
                        log.type === 'success' ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-500'
                      }
                    >
                      {log.type === 'success' && <Check size={8} />}
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {}
      {/* Custom scrollbar injection styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(52, 211, 153, 0.2);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 211, 153, 0.4);
        }
      `}</style>

    </div>
  );
}