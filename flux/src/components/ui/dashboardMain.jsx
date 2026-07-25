"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from "@clerk/nextjs";
import { 
  Plus, Code, Zap, Cloud, GitBranch, Lock, RefreshCw, MoreHorizontal, 
  Star, Eye, ExternalLink, Pencil, Copy, Download, Trash2, X, 
  Search, ChevronDown 
} from 'lucide-react';
import TemplateModal from './templateSelectingModal';
import ConfigureProjectModal from './configureModal';
import ImportGithubModal from './importGithubModal';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function NoProjectsEmptyState() {
  return (
    <div className="w-full flex items-center justify-center px-6">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatYSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 20px 50px -15px rgba(0,0,0,0.6), 0 0 0px rgba(16,185,129,0); }
          50% { box-shadow: 0 20px 50px -15px rgba(0,0,0,0.6), 0 0 22px rgba(16,185,129,0.12); }
        }
        .anim-fade-1 { opacity: 0; animation: fadeUp 0.6s ease-out 0.05s forwards; }
        .anim-fade-2 { opacity: 0; animation: fadeUp 0.6s ease-out 0.2s forwards; }
        .anim-fade-3 { opacity: 0; animation: fadeUp 0.6s ease-out 0.32s forwards; }
        .anim-float { animation: floatY 4s ease-in-out infinite; }
        .anim-float-slow { animation: floatYSlow 5s ease-in-out infinite; }
        .anim-float-delay { animation: floatY 4s ease-in-out infinite; animation-delay: 0.6s; }
        .anim-twinkle { animation: twinkle 2.2s ease-in-out infinite; }
        .anim-twinkle-delay { animation: twinkle 2.2s ease-in-out infinite; animation-delay: 1s; }
        .anim-dot { animation: dotPulse 2.6s ease-in-out infinite; }
        .anim-glow { animation: glow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fade-1, .anim-fade-2, .anim-fade-3 { animation: fadeUp 0.01s forwards; }
          .anim-float, .anim-float-slow, .anim-float-delay, .anim-twinkle,
          .anim-twinkle-delay, .anim-dot, .anim-glow { animation: none; }
        }
      `}</style>

      <div className="flex flex-col items-center max-w-lg w-full">
        <div className="relative w-96 h-60 mb-8 anim-fade-1">
          <span className="absolute left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 anim-dot" style={{ animationDelay: "0.2s" }} />
          <span className="absolute right-9 top-0 w-1.5 h-1.5 rounded-full bg-neutral-600 anim-dot" style={{ animationDelay: "1.1s" }} />
          <span className="absolute left-14 bottom-3 w-1.5 h-1.5 rounded-full bg-neutral-600 anim-dot" style={{ animationDelay: "0.7s" }} />
          <span className="absolute right-3 bottom-12 w-1.5 h-1.5 rounded-full bg-neutral-600 anim-dot" style={{ animationDelay: "1.6s" }} />

          <svg viewBox="0 0 24 24" className="absolute left-12 top-0 w-4.5 h-4.5 text-neutral-500 anim-twinkle" fill="currentColor">
            <path d="M12 0l1.8 8.2L22 10l-8.2 1.8L12 20l-1.8-8.2L2 10l8.2-1.8L12 0z" />
          </svg>

          <svg viewBox="0 0 24 24" className="absolute right-6 top-14 w-6 h-6 text-neutral-500 anim-twinkle-delay" fill="currentColor">
            <path d="M12 0l1.8 8.2L22 10l-8.2 1.8L12 20l-1.8-8.2L2 10l8.2-1.8L12 0z" />
          </svg>

          <svg viewBox="0 0 64 40" className="absolute right-0 top-3 w-[84px] h-[54px] text-neutral-500 anim-float-slow" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 30c-7 0-12-5-12-11 0-5.6 4.2-10.2 9.7-10.9C17.8 3 23.2 0 29 0c7.7 0 14 5.6 14.9 12.8C49.6 13.9 54 18.7 54 24.5 54 31 48.8 36 42.5 36H18z" strokeLinejoin="round" />
          </svg>

          <svg viewBox="0 0 56 46" className="absolute left-0 bottom-0 w-24 h-[78px] text-emerald-500 anim-float-delay" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8c0-1.657 1.343-3 3-3h13l4 5h29c1.657 0 3 1.343 3 3v27c0 1.657-1.343 3-3 3H5c-1.657 0-3-1.343-3-3V8z" strokeLinejoin="round" strokeLinecap="round" />
          </svg>

          <div className="absolute left-1/2 top-9 -translate-x-1/2">
            <div className="absolute inset-0 w-60 h-42 rounded-xl border border-neutral-800 bg-[#0d0f13] -rotate-6 translate-x-1 translate-y-1" />
            <div className="relative w-60 h-42 rounded-xl border border-neutral-700 bg-[#111318] overflow-hidden -rotate-3 anim-float anim-glow">
              <div className="h-9 flex items-center gap-2 px-4 border-b border-neutral-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-center py-1">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-700" />
                <div className="h-2 w-5/6 rounded-full bg-neutral-700" />
                <div className="h-2 w-2/3 rounded-full bg-neutral-700" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-3xl font-semibold tracking-tight anim-fade-2">
          No projects <span className="text-emerald-500">yet</span>
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-neutral-500 max-w-[420px] anim-fade-3">
          Create your first project to start coding, collaborate with others and build something amazing with flux.
        </p>
      </div>
    </div>
  );
}

const Avatar = ({ pfpUrl, initials = "U", size = "w-10 h-13", bgColor = "bg-teal-500" }) => {
  const [imgError, setImgError] = useState(false);
  if (pfpUrl && !imgError) {
    return (
      <div className={`${size} rounded-[12px] overflow-hidden flex-shrink-0`}>
        <img src={pfpUrl} alt="Profile" className="w-full h-full " onError={() => setImgError(true)} />
      </div>
    );
  }
  return (
    <div className={`${size} ${bgColor} rounded-[12px] flex items-center justify-center text-white font-medium tracking-wide flex-shrink-0`}>
      <span>{initials}</span>
    </div>
  );
};

const actionCards = [
  {
    type: 'create',
    title: 'Create New Project',
    description: 'Start from scratch or choose a template to kickstart your next big idea.',
    features: [
      { icon: <Code size={16} />, text: 'Multiple templates to choose from' },
      { icon: <Zap size={16} />, text: 'Instant dev environment setup' },
      { icon: <Cloud size={16} />, text: 'Stored securely in the cloud' },
    ],
    buttonText: 'Create Project',
    buttonIcon: <Plus size={18} />,
    themeColor: 'emerald',
    iconContent: (
      <div className="relative w-24 h-24 mb-2">
        <div className="absolute top-2 left-0 w-20 h-20 bg-[#1A2E26] rounded-2xl transform -rotate-6 border border-[#234335]"></div>
        <div className="absolute top-6 left-4 w-20 h-20 bg-[#162923] rounded-2xl border-2 border-[#3EE092] flex items-center justify-center shadow-[0_0_25px_rgba(62,224,146,0.2)]">
            <Plus size={40} className="text-[#3EE092]" />
        </div>
        <div className="absolute top-0 right-4 text-[#3EE092] opacity-80">✦</div>
        <div className="absolute top-10 -right-2 text-[#3EE092] opacity-80 text-sm">✦</div>
        <div className="absolute top-4 -left-4 text-[#3EE092] opacity-50 text-xs">✦</div>
         <div className="absolute -top-2 right-8 w-12 h-12 flex flex-wrap gap-1 opacity-20 pointer-events-none">
             {[...Array(9)].map((_, i) => <div key={i} className="w-[2px] h-[2px] bg-white rounded-full"></div>)}
         </div>
      </div>
    )
  },
  {
    type: 'import',
    title: 'Import from GitHub',
    description: 'Bring your existing repositories into Flux and start coding right away.',
    features: [
      { icon: <GitBranch size={16} />, text: 'Import public repos' },
      { icon: <Lock size={16} />, text: 'Secure repo Imports' },
      { icon: <RefreshCw size={16} />, text: 'Keep your code in sync' },
    ],
    buttonText: 'Import from GitHub',
    buttonIcon: <GithubIcon size={18} />,
    themeColor: 'red',
    iconContent: (
      <div className="relative w-24 h-24 mb-2">
         <div className="absolute top-2 left-0 w-20 h-20 bg-[#351A1A] rounded-2xl transform -rotate-6 border border-[#522424]"></div>
        <div className="absolute top-6 left-4 w-20 h-20 bg-[#1F0F0F] rounded-2xl border-2 border-[#F87171] flex items-center justify-center shadow-[0_0_25px_rgba(248,113,113,0.2)]">
            <GithubIcon size={40} className="text-white" />
        </div>
         <div className="absolute top-12 -right-4 text-[#F87171] opacity-80">✦</div>
         <div className="absolute top-0 -left-6 w-16 h-16 flex flex-col gap-2 opacity-20 pointer-events-none">
             <div className="w-full h-1 bg-white rounded-full"></div>
             <div className="w-3/4 h-1 bg-white rounded-full"></div>
             <div className="w-5/6 h-1 bg-white rounded-full"></div>
             <div className="w-1/2 h-1 bg-white rounded-full"></div>
             <div className="w-full h-1 bg-white rounded-full"></div>
         </div>
          <div className="absolute -top-2 right-8 w-12 h-12 flex flex-wrap gap-1 opacity-20 pointer-events-none">
             {[...Array(9)].map((_, i) => <div key={i} className="w-[2px] h-[2px] bg-white rounded-full"></div>)}
         </div>
      </div>
    )
  }
];

const ActionCard = ({ card, onClick }) => {
  const themeStyles = {
    emerald: {
      glow: 'bg-[#3EE092]',
      text: 'text-[#3EE092]',
      button: 'bg-[#3EE092] hover:bg-[#32C881] text-[#052E1B] shadow-[0_0_20px_rgba(62,224,146,0.15)] hover:shadow-[0_0_25px_rgba(62,224,146,0.25)]'
    },
    red: {
      glow: 'bg-[#F87171]',
      text: 'text-[#F87171]',
      button: 'bg-[#F87171] hover:bg-[#EF4444] text-white shadow-[0_0_20px_rgba(248,113,113,0.15)] hover:shadow-[0_0_25px_rgba(248,113,113,0.25)]'
    }
  };
  const currentTheme = themeStyles[card.themeColor] || themeStyles.emerald;
  return (
    <div className="bg-[#0F0F10] rounded-3xl p-6 flex flex-col border border-white/[0.05] relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-64 h-64 ${currentTheme.glow} opacity-[0.03] rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity duration-500 group-hover:opacity-[0.06]`}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-center sm:justify-start w-full">{card.iconContent}</div>
        <h2 className="text-white text-xl font-semibold mb-2 tracking-tight">{card.title}</h2>
        <p className="text-[#8B949E] text-[14px] leading-relaxed mb-6">{card.description}</p>
        <div className="space-y-3 mb-8 flex-grow">
          {card.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className={currentTheme.text}>{feature.icon}</span>
              <span className="text-[#8B949E] text-[13px]">{feature.text}</span>
            </div>
          ))}
        </div>
        <button onClick={onClick} className={`w-full py-2.5 px-6 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-medium text-[14px] transition-all duration-200 ${currentTheme.button}`}>
          {card.buttonIcon}
          {card.buttonText}
        </button>
      </div>
    </div>
  );
};

export function EditProjectModal({ isOpen, onClose, onConfirm, initialData, isLoading }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  useEffect(() => {
    if (initialData) setFormData({ title: initialData.title, description: initialData.description });
  }, [initialData]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-[450px] p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
        <h2 className="text-white font-semibold text-lg">Edit Project</h2>
        <p className="text-[#8B929D] text-[13px] mt-1 mb-6">Make changes to your project details here. Click save when you're done.</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white text-[13px] font-medium">Project Title</label>
            <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-red-400 focus:ring-1 focus:ring-red-500 transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-[13px] font-medium">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg px-3 py-2.5 text-white text-[14px] outline-none focus:border-red-400 focus:ring-1 focus:ring-red-500 transition-all resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-5 py-2 text-[14px] font-medium cursor-pointer text-white bg-transparent border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Cancel</button>
          <button disabled={isLoading} onClick={() => onConfirm(formData)} className="px-5 py-2 bg-red-500 text-white text-[14px] font-semibold rounded-lg hover:red-600 cursor-pointer transition-colors disabled:opacity-50">
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteProjectModal({ isOpen, onClose, onConfirm, projectName, isLoading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-[450px] p-6 shadow-2xl">
        <h2 className="text-white font-semibold text-lg">Delete Project</h2>
        <p className="text-[#8B929D] text-[13px] mt-2 mb-6 leading-relaxed">
          Are you sure you want to delete <span className="text-white font-medium">"{projectName}"</span>? This action cannot be undone. All files and data associated with this project will be permanently removed.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-[14px] font-medium cursor-pointer text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Cancel</button>
          <button disabled={isLoading} onClick={onConfirm} className="px-5 py-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white text-[14px] font-semibold rounded-lg transition-colors disabled:opacity-50">
            {isLoading ? "Deleting..." : "Delete Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- CUSTOM FRAMEWORK DROPDOWN WITH CODE ICON ---
const FrameworkDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "All Frameworks", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack" },
  ];

  const selected = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative w-full md:w-44 text-left font-sans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 flex items-center justify-between hover:border-white/20 focus:outline-none focus:border-[#3EE092] transition-all cursor-pointer shadow-sm"
      >
        <div className="flex items-center gap-2.5 truncate">
          <Code className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-[#141415] border border-white/10 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5 backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Framework
          </div>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected ? 'bg-[#3EE092]/10 text-[#3EE092] font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Code className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{option.label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#3EE092]"></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- CUSTOM TEMPLATE DROPDOWN WITH ASSET ICONS ---
const TemplateDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { label: "All Templates", value: "all", icon: null },
    { label: "React", value: "react", icon: "/react.svg" },
    { label: "Vue", value: "vue", icon: "/vuejs-icon.svg" },
    { label: "Angular", value: "angular", icon: "/angular-2.svg" },
    { label: "Next.js", value: "next", icon: "/nextjs-icon.svg" },
    { label: "Hono", value: "hono", icon: "/hono.svg" },
    { label: "Express", value: "express", icon: "/expressjs-icon-white.svg" },
  ];

  const selected = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative w-full md:w-44 text-left font-sans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-200 flex items-center justify-between hover:border-white/20 focus:outline-none focus:border-[#3EE092] transition-all cursor-pointer shadow-sm"
      >
        <div className="flex items-center gap-2.5 truncate">
          {selected.icon ? (
            <img src={selected.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
          ) : (
            <Code className="w-4 h-4 text-gray-400 shrink-0" />
          )}
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-[#141415] border border-white/10 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5 backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Template
          </div>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected ? 'bg-[#3EE092]/10 text-[#3EE092] font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {option.icon ? (
                    <img src={option.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
                  ) : (
                    <Code className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <span>{option.label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#3EE092]"></span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AppCard = ({ app, isInitiallyStarred, onUpdateProject, onDeleteProject }) => {
  const { getToken } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [favourite, setFavourite] = useState(isInitiallyStarred);

  useEffect(() => { setFavourite(isInitiallyStarred); }, [isInitiallyStarred]);

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return { part1: 'N/A', part2: '' };
    if (typeof dateStr === 'string' && dateStr.includes(', ')) {
      const parts = dateStr.split(', ');
      return { part1: parts[0], part2: parts[1] };
    }
    try {
      const d = new Date(dateStr);
      const formatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d); 
      const parts = formatted.split(', ');
      return { part1: parts[0], part2: parts[1] };
    } catch (e) {
      return { part1: dateStr.substring(0, 10), part2: '' };
    }
  };
  const dateDisplay = formatDisplayDate(app.createdAt);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setEditData({ title: project.title, description: project.description });
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteDialogOpen(true); 
    setIsMenuOpen(false);      
  };
  const handleUpdateProject = async (updatedData) => {
    setIsLoading(true);
    try {
      await apiClient.patch(`/api/workspace/${app.id}`, updatedData);
      onUpdateProject(app.id, updatedData);
      toast.success("Project Updated Successfully");
      setEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to Update");
    } finally { setIsLoading(false); }
  };
  const handleMarkAsMyFavorite = async (e) => {
    if(e) e.stopPropagation();
    setIsLoading(true);
    try {
      const newStatus = !favourite;
      await apiClient.post("/api/workspace/toggle-star", { workspaceId: app.id, isMarked: newStatus });
      setFavourite(newStatus);
      toast.success(newStatus ? "Added to Favorites" : "Removed from Favorites");
    } catch (error) {
      toast.error("Failed to update favorite status");
    } finally { setIsLoading(false); }
  };
  const handleDeleteProject = async () => {
    setIsLoading(true);
    try {
      await apiClient.delete(`/api/workspace/${app.id}`);
      onDeleteProject(app.id);
      toast.success("Project Deleted Successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to Delete Project");
    } finally { setIsLoading(false); }
  };
  const copyProjectUrl = (projectId) => {
    const url = `${window.location.origin}/dashboard/playground/${projectId}`;
    navigator.clipboard.writeText(url);
    toast.success("URL Copied to clipboard");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const getTemplateLogo = (templateName) => {
    if (!templateName || typeof templateName !== 'string') return '/file.svg'; 
    const name = templateName.toLowerCase();
    if (name.includes('hono')) return '/hono.svg';
    if (name.includes('react')) return '/react.svg';
    if (name.includes('express')) return '/expressjs-icon-white.svg';
    if (name.includes('next')) return '/nextjs-icon.svg';
    if (name.includes('vue')) return '/vuejs-icon.svg';
    if (name.includes('angular')) return '/angular-2.svg';
    return '/file.svg'; 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const remainingTags = app.tagCount ? app.tagCount - 3 : 0;

  return (
    <div className="bg-[#0F0F10] rounded-[16px] p-6 flex flex-col justify-between h-full border border-white/5 transition-all">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-[17px] tracking-tight">{app.title}</h3>
          </div>
          {favourite && (
            <div className="text-red-400">
              <Star size={18} className="fill-current" />
            </div>
          )}
        </div>
        <p className="text-[#8B929D] text-[13px] leading-[1.4] mb-6 min-h-[40px] line-clamp-2 break-words">{app.description}</p>
      </div>

      <div>
        <div className="flex gap-5 mb-6">
          <div className="flex flex-col flex-1 min-w-0">
            <Avatar pfpUrl={getTemplateLogo(app.template)}/>
            <span className="text-[#8B929D] text-[13px]">Template</span>
          </div>
          <div className="ml-5 flex flex-col min-w-0 mt-[8px] mr-[16px]">
            <span className="text-white font-semibold text-[17px] leading-tight mb-0.5">
              {dateDisplay.part1}<br />{dateDisplay.part2}
            </span>
            <span className="text-[#8B929D] text-[13px]">Created At</span>
          </div>
          <div className="flex flex-col flex-1 mt-2 min-w-0">
            <div className="mb-1">
              <Avatar pfpUrl={app.owner?.imageUrl} initials={app.owner?.name ? app.owner.name[0].toUpperCase() : "U"} size="w-10 h-10" bgColor="bg-teal-600" />
            </div>
            <span className="text-[#8B929D] text-[13px]">Owner</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 bg-[#1C1F23] px-1 py-1 rounded-[6px]">
            <div className="flex gap-[2px]"></div>
            {app.tagCount > 3 && <span className="text-[#8B929D] text-[12px] font-medium px-2">+{remainingTags} Others</span>}
          </div>
          <div className="relative" ref={menuRef}>
            <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="text-[#8B929D] hover:text-white transition-colors cursor-pointer p-1 rounded-lg">
              <MoreHorizontal size={20} />
            </button>
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-[190px] bg-[#1a1a1a] border border-white/5 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5">
                <button onClick={(e) => { e.stopPropagation(); handleMarkAsMyFavorite(e); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-red-400 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
                  <Star size={16} className={favourite ? "fill-current" : ""} />
                  <span className="font-medium">{favourite ? 'Remove Favorite' : 'Add Favorite'}</span>
                </button>
                <div className="h-px bg-white/10 my-1 mx-1"></div>
                
                <button onClick={(e) => { e.stopPropagation(); window.location.href = `/dashboard/playground/${app.id}`; setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
                  <Eye size={16} className="text-gray-400" />
                  <span className="font-medium">Open in Full Page</span>
                </button>
                
                <button onClick={(e) => { e.stopPropagation(); window.open(`/dashboard/playground/${app.id}`, '_blank'); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
                  <ExternalLink size={16} className="text-gray-400" />
                  <span className="font-medium">Open in New Tab</span>
                </button>
                <div className="h-px bg-white/10 my-1 mx-1"></div>
                <button onClick={(e) => { e.stopPropagation(); handleEditClick(app); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
                  <Pencil size={16} className="text-gray-400" />
                  <span className="font-medium">Edit Project</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); copyProjectUrl(app.id); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
                  <Download size={16} className="text-gray-400" />
                  <span className="font-medium">Copy URL</span>
                </button>
                <div className="h-px bg-white/10 my-1 mx-1"></div>
                <button onClick={handleDeleteClick} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] cursor-pointer text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left">
                  <Trash2 size={16} />
                  <span className="font-medium">Delete Project</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditProjectModal isOpen={editDialogOpen} onClose={() => setEditDialogOpen(false)} initialData={{ title: app.title, description: app.description }} isLoading={isLoading} onConfirm={async (updatedData) => { await handleUpdateProject(updatedData); }} />
      <DeleteProjectModal isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} projectName={app.title} isLoading={isLoading} onConfirm={handleDeleteProject} />
    </div>
  );
};

export default function App({ appData, setAppData, activeView }) {
  const { user } = useUser();
  const router = useRouter();
  const [starredIds, setStarredIds] = useState([]);
  const [isStarredLoaded, setIsStarredLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("all");
  const [templateFilter, setTemplateFilter] = useState("all");

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const response = await apiClient.get("/api/workspace/starred-ids");
        setStarredIds(response.data.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsStarredLoaded(true);
      }
    };
    fetchStarred();
  }, []);

  const handleUpdateProjectInList = (id, updatedFields) => {
    setAppData((prev) => prev.map((app) => app.id === id ? { ...app, ...updatedFields } : app));
  };
  const handleDeleteProjectFromList = (id) => {
    setAppData((prev) => prev.filter((app) => app.id !== id));
  };
  
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false); 
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async ({ projectName, description }) => {
    setIsLoading(true);
    try {
      const payload = { title: projectName, description: description };
      if (selectedTemplate?.name) payload.template = selectedTemplate.name;
      const response = await apiClient.post('/api/workspace', payload);
      const newWorkspace = response.data.data; 
      setAppData((prev) => [newWorkspace, ...prev]);
      handleCloseAll();
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push(`/dashboard/playground/${newWorkspace.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create workspace");
    } finally { setIsLoading(false); }
  };

  const handleImportGithub = async (repoUrl) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/template/import', { repoUrl });
      const newWorkspace = response.data?.data || response.data?.workspace || response.data; 
      if (newWorkspace && newWorkspace.id) {
        setAppData((prev) => [newWorkspace, ...prev]);
      }
      handleCloseAll();
      toast.success("Repository imported successfully!");
      router.refresh(); 
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push(`/dashboard/playground/${newWorkspace.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to import repository");
    } finally { setIsLoading(false); }
  };

  const handleCloseAll = () => {
    setIsTemplateModalOpen(false);
    setIsConfigModalOpen(false);
    setIsGithubModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleActionCardClick = (type) => {
    if (type === 'create') setIsTemplateModalOpen(true);
    else if (type === 'import') setIsGithubModalOpen(true); 
  };
  
  const handleTemplateSubmit = (template) => {
    setSelectedTemplate(template);
    setIsTemplateModalOpen(false);
    setIsConfigModalOpen(true);
  };

  let displayedProjects = appData || [];
  let pageTitle = "Projects";

  if (activeView === 'starred') {
    displayedProjects = displayedProjects.filter(app => starredIds.includes(app.id));
    pageTitle = "Starred Projects";
  } else if (activeView === 'all') {
    pageTitle = "All Projects";
  } else if (activeView === 'dashboard') {
    pageTitle = "Recent Projects";
  } else if (activeView === 'created') {
    pageTitle = "Created by me";
    displayedProjects = displayedProjects.filter(app => !app.description?.toLowerCase().includes('imported from'));
  } else if (activeView === 'shared') {
    pageTitle = "GitHub Imports";
    displayedProjects = displayedProjects.filter(app => app.description?.toLowerCase().includes('imported from') || app.repoUrl);
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    displayedProjects = displayedProjects.filter(app => 
      app.title?.toLowerCase().includes(query) || 
      app.description?.toLowerCase().includes(query)
    );
  }

  if (frameworkFilter !== "all") {
    displayedProjects = displayedProjects.filter(app => {
      const temp = (app.template || "").toLowerCase();
      if (frameworkFilter === "frontend") {
        return temp.includes("react") || temp.includes("vue") || temp.includes("angular");
      } else if (frameworkFilter === "backend") {
        return temp.includes("express") || temp.includes("hono") || temp.includes("node");
      } else if (frameworkFilter === "fullstack") {
        return temp.includes("next");
      }
      return true;
    });
  }

  if (templateFilter !== "all") {
    displayedProjects = displayedProjects.filter(app => {
      const temp = (app.template || "").toLowerCase();
      return temp.includes(templateFilter);
    });
  }

  const hasAnyProjectsAtAll = appData && appData.length > 0;

  return (
    <div className="min-h-screen p-6 sm:p-8 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {activeView === 'dashboard' && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-8xl mx-auto md:mx-0">
               {actionCards.map((card, index) => (
                 <ActionCard key={index} card={card} onClick={() => handleActionCardClick(card.type)} />
               ))}
            </div>
          </section>
        )}

        <section>
          {!hasAnyProjectsAtAll ? (
            <NoProjectsEmptyState />
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-semibold text-white tracking-tight">{pageTitle}</h1>
                
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-60">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search projects..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3EE092] transition-colors"
                    />
                  </div>
                  
                  {/* Framework Dropdown with Code Icon */}
                  <FrameworkDropdown value={frameworkFilter} onChange={setFrameworkFilter} />

                  {/* Template Dropdown with Asset Icons */}
                  <TemplateDropdown value={templateFilter} onChange={setTemplateFilter} />
                </div>
              </div>

              {isStarredLoaded && displayedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedProjects.map((app) => (
                    <AppCard 
                      key={app.id} 
                      app={app} 
                      isInitiallyStarred={starredIds.includes(app.id)}
                      onUpdateProject={handleUpdateProjectInList} 
                      onDeleteProject={handleDeleteProjectFromList}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-[#0F0F10] rounded-[16px] border border-white/5">
                  <Search className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">No matching projects found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search or template filter.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setFrameworkFilter("all"); setTemplateFilter("all"); }}
                    className="mt-6 text-[#3EE092] hover:underline text-sm font-medium cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <TemplateModal isOpen={isTemplateModalOpen} onClose={handleCloseAll} onSubmit={handleTemplateSubmit} />
      <ConfigureProjectModal isOpen={isConfigModalOpen} onClose={handleCloseAll} onBack={() => { setIsConfigModalOpen(false); setIsTemplateModalOpen(true); }} onCreate={handleCreateProject} template={selectedTemplate} />
      <ImportGithubModal isOpen={isGithubModalOpen} onClose={handleCloseAll} onImport={handleImportGithub} isLoading={isLoading} />
    </div>
  );
} 