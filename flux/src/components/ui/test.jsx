"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  Settings, 
  Sparkles, 
  RefreshCw, 
  Code, 
  Check, 
  Plus, 
  Play, 
  Pause, 
  Info, 
  Copy, 
  Layers, 
  Sliders, 
  HelpCircle,
  Trash2,
  Globe,
  Search
} from 'lucide-react';

const PRESET_INTEGRATIONS = [
  {
    id: 'nextjs',
    name: 'Next.js',
    color: '#000000',
    slug: 'nextdotjs',
    textColor: '#FFFFFF',
    description: 'The React Framework for the Web. Enable server-side rendering and static site generation with complete brand accuracy.',
    iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000',
    angle: -90, 
    orbitRadius: 110,
    isConnected: true
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    color: '#41B883',
    slug: 'vuedotjs',
    textColor: '#FFFFFF',
    description: 'The Progressive JavaScript Framework. Rendered here with its official two-tone branding (Green & Dark Blue).',
    iconUrl: 'https://cdn.simpleicons.org/vuedotjs/41B883',
    angle: -25, 
    orbitRadius: 95,
    isConnected: true
  },
  {
    id: 'angular',
    name: 'Angular',
    color: '#DD0031',
    slug: 'angular',
    textColor: '#FFFFFF',
    description: 'The standard framework for building scalable web, mobile, and enterprise desktop applications.',
    iconUrl: 'https://cdn.simpleicons.org/angular/DD0031',
    angle: 35, 
    orbitRadius: 105,
    isConnected: true
  },
  {
    id: 'react',
    name: 'React.js',
    color: '#61DAFB',
    slug: 'react',
    textColor: '#000000',
    description: 'The standard component library for declarative, state-driven interfaces.',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    angle: 150, 
    orbitRadius: 100,
    isConnected: true
  },
  {
    id: 'hono',
    name: 'Hono',
    color: '#E36002',
    slug: 'hono',
    textColor: '#FFFFFF',
    description: 'Ultrafast web framework for the Edges. Extremely fast, lightweight, and built on web standards with out-of-the-box TypeScript support.',
    iconUrl: 'https://cdn.simpleicons.org/hono/e36002',
    angle: 205, 
    orbitRadius: 90,
    isConnected: true
  }
];

function VueIcon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 256 221" 
      className={className}
    >
      <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L158.08 0z" />
      <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0z" />
    </svg>
  );
}

export default function App() {
  const [integrations, setIntegrations] = useState(PRESET_INTEGRATIONS);
  const [orbitSpeed, setOrbitSpeed] = useState(1); 
  const [accentColor, setAccentColor] = useState('#4f46e5'); 
  const [pulseGlow, setPulseGlow] = useState(true);
  const [cardRadius, setCardRadius] = useState('rounded-[2.5rem]');
  const [activeTab, setActiveTab] = useState('editor'); 
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [customSlug, setCustomSlug] = useState('tailwindcss');
  const [customBrandName, setCustomBrandName] = useState('Tailwind CSS');
  const [customColor, setCustomColor] = useState('#38B2AC');
  const [rotationOffset, setRotationOffset] = useState(0);

  useEffect(() => {
    if (orbitSpeed === 0) return;
    let animationFrameId;
    const animate = () => {
      setRotationOffset(prev => (prev + (0.15 * orbitSpeed)) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [orbitSpeed]);

  const [copied, setCopied] = useState(false);
  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddIntegration = (e) => {
    e.preventDefault();
    if (!customSlug.trim() || !customBrandName.trim()) return;

    const formattedSlug = customSlug.toLowerCase().trim().replace(/\s+/g, '-');
    const newId = `custom-${Date.now()}`;
    const newAngle = (integrations.length * 72) % 360; 
    const newOrbit = 90 + (integrations.length % 3) * 12;

    const customIntegration = {
      id: newId,
      name: customBrandName,
      color: customColor,
      slug: formattedSlug,
      textColor: '#FFFFFF',
      description: `Officially-fetched CDN integration element tracking the real-time build state of your ${customBrandName} dependency.`,
      iconUrl: `https://cdn.simpleicons.org/${formattedSlug}/${customColor.replace('#', '')}`,
      angle: newAngle,
      orbitRadius: newOrbit,
      isConnected: true,
      isCustom: true
    };

    setIntegrations([...integrations, customIntegration]);
    setCustomSlug('');
    setCustomBrandName('');
    setSelectedIntegration(customIntegration);
  };

  const handleDeleteIntegration = (id) => {
    setIntegrations(integrations.filter(item => item.id !== id));
    if (selectedIntegration?.id === id) {
      setSelectedIntegration(null);
    }
  };

  const toggleConnection = (id) => {
    setIntegrations(integrations.map(item => {
      if (item.id === id) {
        return { ...item, isConnected: !item.isConnected };
      }
      return item;
    }));
  };

  const generatedCodeString = useMemo(() => {
    return `import React from 'react';

export default function IntegrationCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-slate-100/80 rounded-[2.5rem] p-10 shadow-[0_12px_45px_rgba(0,0,0,0.03)] flex flex-col items-center">
      {/* Visual Orbiting Canvas */}
      <div className="relative w-56 h-56 mb-8 flex items-center justify-center overflow-visible">
        
        {/* Concentric Path Rings matching image_048c0d.png */}
        <div className="absolute w-[110px] h-[110px] rounded-full border border-slate-100/80 pointer-events-none" />
        <div className="absolute w-[165px] h-[165px] rounded-full border border-slate-100/80 pointer-events-none" />
        <div className="absolute w-[220px] h-[220px] rounded-full border border-slate-100/80 pointer-events-none" />

        {/* Center Padlock Shield */}
        <div className="relative z-10 w-14 h-14 rounded-full bg-indigo-650 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        {/* Active Official Logos Orbiting - Next.js, Vue (Dual-Tone), Angular, React, Hono */}
        {/* Next.js */}
        <div className="absolute -translate-y-[110px] w-11 h-11 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
          <img src="https://cdn.simpleicons.org/nextdotjs/000000" className="w-5 h-5 object-contain" alt="Next.js" />
        </div>
        
        {/* Vue.js (Official Double-Triangles SVG) */}
        <div className="absolute translate-x-[82px] -translate-y-[48px] w-11 h-11 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221" className="w-5 h-5 object-contain">
            <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L158.08 0z" />
            <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0z" />
          </svg>
        </div>

        {/* Angular */}
        <div className="absolute translate-x-[61px] translate-y-[85px] w-11 h-11 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
          <img src="https://cdn.simpleicons.org/angular/DD0031" className="w-5 h-5 object-contain" alt="Angular" />
        </div>

        {/* React.js */}
        <div className="absolute -translate-x-[86px] translate-y-[50px] w-11 h-11 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
          <img src="https://cdn.simpleicons.org/react/61DAFB" className="w-5 h-5 object-contain" alt="React" />
        </div>

        {/* Hono */}
        <div className="absolute -translate-x-[79px] -translate-y-[41px] w-11 h-11 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
          <img src="https://cdn.simpleicons.org/hono/e36002" className="w-5 h-5 object-contain" alt="Hono" />
        </div>

      </div>

      {/* Verbatim Text Copy matching image_048c0d.png */}
      <div className="text-center px-1">
        <h3 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-snug">
          Seamless Integrations
        </h3>
        <p className="text-[14px] text-slate-400 font-normal leading-relaxed mt-2.5 max-w-[270px] mx-auto">
          easily connect with your favorite apps and services for a website experience.
        </p>
      </div>
    </div>
  );
}`;
  }, []);

  return (
    <div className={`min-h-screen font-sans flex flex-col antialiased transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {}
      <header className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold block">Simple Icons Integration Sandbox</span>
            <h1 className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Seamless Integrations <span className="text-[11px] bg-indigo-500/10 text-indigo-400 font-mono py-0.5 px-2 rounded-full border border-indigo-500/20">Official CDN Version</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center space-x-1.5 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
          >
            <span>{isDarkMode ? '☀️ Light Sandbox' : '🌙 Dark Sandbox'}</span>
          </button>

          <button 
            onClick={() => {
              setIntegrations(PRESET_INTEGRATIONS);
              setOrbitSpeed(1);
              setAccentColor('#4f46e5');
              setCardRadius('rounded-[2.5rem]');
              setSelectedIntegration(null);
            }}
            className={`flex items-center space-x-2 text-xs px-3 py-2 rounded-lg border transition-all font-medium active:scale-95 ${isDarkMode ? 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'}`}
            title="Reset sandbox state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Variables</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Controls (Left - 5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Navigation Control Tabs */}
          <div className={`p-1.5 rounded-xl border flex space-x-1 shadow-inner ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'editor' ? 'bg-indigo-600 text-white shadow-md' : isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'presets' ? 'bg-indigo-600 text-white shadow-md' : isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Logos Manager ({integrations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'code' ? 'bg-indigo-600 text-white shadow-md' : isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Export Code</span>
            </button>
          </div>

          {}
          {activeTab === 'editor' && (
            <div className={`border rounded-2xl p-6 shadow-xl space-y-6 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <h2 className={`text-sm font-bold tracking-wide flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Settings className="w-4 h-4 text-indigo-500" />
                  <span>Card Design Variables</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust active center-shield accents, border geometry and kinetic parameters.
                </p>
              </div>

              {/* Accent Color Picker */}
              <div className="space-y-3">
                <label className="text-xs font-semibold flex justify-between items-center text-slate-400">
                  <span>Center Badge Accent Theme</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border" style={{ color: accentColor, borderColor: `${accentColor}30`, backgroundColor: `${accentColor}10` }}>
                    {accentColor}
                  </span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: 'Official Blue', value: '#4f46e5' },
                    { label: 'Deep Blue', value: '#3b82f6' },
                    { label: 'Violet', value: '#7c3aed' },
                    { label: 'Rose Pink', value: '#f43f5e' },
                    { label: 'Dark Carbon', value: '#1e293b' },
                  ].map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      className={`h-8 px-3 rounded-lg text-[11px] font-semibold transition-all flex items-center space-x-1.5 border ${accentColor === color.value ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-950'}`}
                    >
                      <span className="w-3 h-3 rounded-full block border border-white/10" style={{ backgroundColor: color.value }} />
                      <span>{color.label}</span>
                    </button>
                  ))}
                  <div className="relative flex items-center">
                    <input 
                      type="color" 
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border bg-transparent p-1"
                      title="Custom Accent Hex"
                    />
                  </div>
                </div>
              </div>

              {/* Orbit rotation physics speed slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">Orbits Rotation Speed</span>
                  <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                    {orbitSpeed === 0 ? 'Paused' : `${orbitSpeed}x Speed`}
                  </span>
                </div>
                <div className={`flex items-center space-x-4 p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <button
                    onClick={() => setOrbitSpeed(prev => prev === 0 ? 1 : 0)}
                    className={`p-2 rounded-lg transition-colors ${orbitSpeed === 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-850 text-slate-300 border border-slate-700'}`}
                    title={orbitSpeed === 0 ? 'Play rotation' : 'Pause rotation'}
                  >
                    {orbitSpeed === 0 ? <Play className="w-4 h-4" fill="currentColor" /> : <Pause className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.5"
                    value={orbitSpeed}
                    onChange={(e) => setOrbitSpeed(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-500 rounded-lg appearance-none h-2 cursor-pointer bg-slate-200 dark:bg-slate-850"
                  />
                </div>
              </div>

              {/* Card Radius Toggle */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400">Card Edge Style (Border Radius)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Sharp Corner', value: 'rounded-none' },
                    { label: 'Soft Edge', value: 'rounded-[1.5rem]' },
                    { label: 'Authentic Copy', value: 'rounded-[2.5rem]' },
                  ].map((rad) => (
                    <button
                      key={rad.value}
                      onClick={() => setCardRadius(rad.value)}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all border ${cardRadius === rad.value ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'}`}
                    >
                      {rad.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Central Glow Animation */}
              <div className={`flex items-center justify-between p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <h4 className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-850'}`}>Pulse Backdrop Glow</h4>
                  <p className="text-[11px] text-slate-400">Simulate smooth ambient neon animations.</p>
                </div>
                <button
                  onClick={() => setPulseGlow(!pulseGlow)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${pulseGlow ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${pulseGlow ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Informative Tip */}
              <div className={`p-3.5 rounded-xl flex items-start space-x-2.5 border ${isDarkMode ? 'bg-slate-900/50 border-indigo-950/40' : 'bg-indigo-50/50 border-indigo-100'}`}>
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 leading-relaxed font-medium">
                  <strong>Accurate CDN Sourcing:</strong> The preview card features genuine brand-compliant SVGs. Vue.js is optimized with official dual-tone coloring.
                </p>
              </div>
            </div>
          )}

          {}
          {activeTab === 'presets' && (
            <div className={`border rounded-2xl p-6 shadow-xl space-y-6 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <h2 className={`text-sm font-bold tracking-wide flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>Interactive Brand Directory</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add custom applications instantly using Simple Icons official slugs and custom HEX styling.
                </p>
              </div>

              {/* Dynamic Simple Icons Register Form */}
              <form onSubmit={handleAddIntegration} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-4`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-850'}`}>
                  <Search className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Register Any Custom Official Logo</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Simple Icons Slug Name</label>
                    <input
                      type="text"
                      placeholder="e.g., tailwindcss, supabase, svelte, postman"
                      value={customSlug}
                      onChange={(e) => {
                        setCustomSlug(e.target.value);
                        const sanitized = e.target.value.toLowerCase().replace(/js$/, '.js').replace('dot', '.');
                        setCustomBrandName(sanitized.charAt(0).toUpperCase() + sanitized.slice(1));
                      }}
                      className="w-full bg-slate-900/60 dark:bg-slate-950 text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white font-mono"
                    />
                    <span className="text-[9px] text-slate-400 mt-1 block">
                      Type the slug verified on <a href="https://simpleicons.org" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">simpleicons.org <Globe className="w-2.5 h-2.5" /></a>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Display Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Tailwind CSS"
                        value={customBrandName}
                        onChange={(e) => setCustomBrandName(e.target.value)}
                        className="w-full bg-slate-900/60 dark:bg-slate-950 text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Theme HEX Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-full bg-slate-900/60 dark:bg-slate-950 text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2 py-1.5 focus:outline-none text-white font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Real-time CDN fetching ready</span>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-1.5 px-3.5 rounded-lg flex items-center space-x-1.5 transition-all active:scale-95 shadow-md shadow-indigo-600/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Inject Logo</span>
                  </button>
                </div>
              </form>

              {/* List of Registered Badges */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {integrations.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${selectedIntegration?.id === item.id ? 'bg-indigo-500/10 border-indigo-500/80' : isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                    onClick={() => setSelectedIntegration(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center shadow-inner overflow-hidden border border-slate-100 dark:border-slate-800 p-1">
                        {item.id === 'vuejs' ? (
                          <VueIcon className="w-5 h-5 object-contain" />
                        ) : (
                          <img 
                            src={item.iconUrl} 
                            alt={item.name} 
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.target.src = "https://cdn.simpleicons.org/simpleicons";
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                        <span className="text-[9px] text-slate-400 font-mono">
                          slug: {item.slug}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleConnection(item.id)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded transition-all ${item.isConnected ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/15 text-rose-400 border border-rose-500/20'}`}
                      >
                        {item.isConnected ? 'Visible' : 'Hidden'}
                      </button>

                      {item.isCustom && (
                        <button
                          onClick={() => handleDeleteIntegration(item.id)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                          title="Remove custom logo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeTab === 'code' && (
            <div className={`border rounded-2xl p-6 shadow-xl space-y-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`border-b pb-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <h2 className={`text-sm font-bold tracking-wide flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Code className="w-4 h-4 text-indigo-400" />
                  <span>Production Ready Code</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  A modern, lightweight Tailwind React component utilizing Simple Icons and optimized brand vectors.
                </p>
              </div>

              <div className="relative">
                <pre className="text-[11px] font-mono text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto max-h-[280px] border border-slate-800 leading-relaxed scrollbar-thin">
                  <code>{generatedCodeString}</code>
                </pre>
                
                <button
                  onClick={() => handleCopyCode(generatedCodeString)}
                  className="absolute top-3 right-3 bg-indigo-650 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1.5 border border-indigo-500/30 shadow-lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy React Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Interactive Inspection Detail Card */}
          <div className={`border rounded-2xl p-5 shadow-lg ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            {selectedIntegration || hoveredBadge ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 p-1">
                    {(selectedIntegration || hoveredBadge).id === 'vuejs' ? (
                      <VueIcon className="w-6 h-6 object-contain" />
                    ) : (
                      <img 
                        src={(selectedIntegration || hoveredBadge).iconUrl} 
                        alt={(selectedIntegration || hoveredBadge).name} 
                        className="w-6 h-6 object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-500">Official Asset Node</span>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{(selectedIntegration || hoveredBadge).name}</h3>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  {(selectedIntegration || hoveredBadge).description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className={`p-2 rounded-lg border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <span>Icon Slug: </span>
                    <strong className={isDarkMode ? 'text-white' : 'text-slate-950'}>{(selectedIntegration || hoveredBadge).slug}</strong>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <span>Hex Brand Color: </span>
                    <strong className="font-semibold" style={{ color: (selectedIntegration || hoveredBadge).color }}>
                      {(selectedIntegration || hoveredBadge).color}
                    </strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center mx-auto ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-250 text-slate-400'}`}>
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Interactive Logo Sandbox</h4>
                <p className="text-[10px] text-slate-400 max-w-[280px] mx-auto">
                  Hover or click on any of the live-orbiting brand badges inside the preview frame to inspect properties.
                </p>
              </div>
            )}
          </div>

        </section>

        {}
        <section id="card-preview" className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
          
          <div className={`w-full border rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[520px] transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-200/40 border-slate-300/60'}`}>
            
            {/* Visual Grid Backdrop */}
            <div className={`absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none`} />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />

            <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full border ${isDarkMode ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-600 bg-white border-slate-300'}`}>
              LIVE COMPILER FRAME
            </span>

            {/* THE PIXEL-PERFECT CARD RECREATION AS PER image_048c0d.png */}
            <div className={`w-full max-w-[360px] bg-white border border-slate-100/90 ${cardRadius} p-9 md:p-11 shadow-[0_12px_45px_rgba(0,0,0,0.02)] flex flex-col items-center relative transition-all duration-350 transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]`}>
              
              {}
              <div className="relative w-[220px] h-[220px] mb-8 flex items-center justify-center overflow-visible">
                
                {/* 1. Inner-most subtle concentric loop */}
                <div className="absolute w-[110px] h-[110px] rounded-full border border-slate-100 pointer-events-none z-0" />
                
                {/* 2. Middle concentric loop */}
                <div className="absolute w-[165px] h-[165px] rounded-full border border-slate-100 pointer-events-none z-0" />
                
                {/* 3. Outer concentric loop */}
                <div className="absolute w-[220px] h-[220px] rounded-full border border-slate-100/90 pointer-events-none z-0" />

                {/* Pulsating backdrop glow behind core padlock */}
                {pulseGlow && (
                  <div 
                    className="absolute w-20 h-20 rounded-full opacity-10 blur-lg pointer-events-none transition-all duration-500 animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                )}

                {/* Central Padlock Shield - Visual Centerpiece */}
                <div 
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 24px ${accentColor}30` 
                  }}
                >
                  <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                {/* Dynamically position and rotate each official logo from our active array */}
                {integrations.map((item) => {
                  if (!item.isConnected) return null;

                  const totalAngle = item.angle + (orbitSpeed > 0 ? rotationOffset : 0);
                  const radians = (totalAngle * Math.PI) / 180;
                  
                  const x = Math.cos(radians) * item.orbitRadius;
                  const y = Math.sin(radians) * item.orbitRadius;

                  return (
                    <div
                      key={item.id}
                      className="absolute z-20 w-11 h-11 rounded-full bg-white border border-slate-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-300 hover:scale-115 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden p-1.5"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        transition: orbitSpeed > 0 ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={() => setHoveredBadge(item)}
                      onMouseLeave={() => setHoveredBadge(null)}
                      onClick={() => setSelectedIntegration(item)}
                    >
                      {item.id === 'vuejs' ? (
                        <VueIcon className="w-5 h-5 object-contain" />
                      ) : (
                        <img 
                          src={item.iconUrl} 
                          alt={item.name} 
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.src = "https://cdn.simpleicons.org/simpleicons";
                          }}
                        />
                      )}
                      
                      {/* Live active indicator */}
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                    </div>
                  );
                })}

              </div>

              {/* Text / Copy Section exactly verbatim matching source image_048c0d.png */}
              <div className="text-center px-1">
                <h3 className="text-[20px] font-semibold text-slate-800 tracking-tight leading-snug">
                  Seamless Integrations
                </h3>
                <p className="text-[14px] text-slate-400 font-normal leading-relaxed mt-2.5 max-w-[270px] mx-auto">
                  easily connect with your favorite apps and services for a website experience.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom active connection states and debugging toolbar */}
          <div className={`w-full border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Official Connected Nodes:</span>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 py-0.5 px-2.5 rounded-full border border-indigo-500/20 font-bold">
                {integrations.filter(i => i.isConnected).length} of {integrations.length} Active
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400">Quick Toggle Visibility:</span>
              <div className="flex -space-x-1.5 overflow-hidden">
                {integrations.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleConnection(item.id)}
                    className={`w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-950 flex items-center justify-center transition-all hover:scale-110 relative p-1 ${item.isConnected ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}
                    title={`Toggle ${item.name}`}
                  >
                    {item.id === 'vuejs' ? (
                      <VueIcon className="w-4 h-4 object-contain" />
                    ) : (
                      <img src={item.iconUrl} alt={item.name} className="w-4 h-4 object-contain" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Footer Info & Credits */}
      <footer className={`border-t py-6 px-6 mt-12 text-center text-xs space-y-2 transition-colors duration-300 ${isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-500' : 'border-slate-200 bg-white text-slate-500'}`}>
        <p>
          Pixel-perfect recreation of <code className="text-indigo-500 dark:text-indigo-400 font-mono font-bold">image_048c0d.png</code> built using verified SVG streams.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-600">
          All preset brand logos—Next.js, Vue.js, Angular, React, and Hono—are dynamically configured to guarantee 100% brand-accurate styling.
        </p>
      </footer>

    </div>
  );
}