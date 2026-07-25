"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Folder, Star, User, Users, PanelLeft, 
  MoreHorizontal, Plus, Eye, ExternalLink, Pencil, Copy, 
  Download, Trash2, UserPlus, ChevronRight 
} from 'lucide-react';
import Link from "next/link";

const Logo = () => (
  <Link href="/" className="cursor-pointer">
    <div className="flex items-center gap-3">
      <img src="/flux-logo-Photoroom.png" alt="Flux Logo" width={40} height={40} />
    </div>
  </Link>
);

const MockUserButton = () => <UserButton />;

const Sidebar = ({ projects = [],setAppData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useUser();
  
  const handleSidebarClick = () => {
    if (isCollapsed) setIsCollapsed(false);
  };

  return (
    <div 
      onClick={handleSidebarClick}
      className={`h-screen bg-[#0a0a0a] text-gray-200 flex flex-col font-sans border-r border-white/5 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? 'w-[68px] group/sidebar cursor-pointer' : 'w-[260px]'
      }`}
    >
      <div className={`flex-1 px-3 py-4 flex flex-col ${isCollapsed ? 'gap-3 items-center' : 'gap-4'}`}>
        
        {/* Top Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-1'} mb-2 w-full`}>
          <button 
            onClick={(e) => { e.stopPropagation(); isCollapsed && setIsCollapsed(false); }}
            className={`focus:outline-none flex items-center justify-center ${isCollapsed ? 'cursor-pointer rounded-xl w-10 h-10 transition-colors' : 'cursor-default'}`}
          >
            {isCollapsed ? (
              <>
                <div className="block group-hover/sidebar:hidden flex items-center justify-center">
                  <img src="/flux-logo-Photoroom.png" alt="Flux Logo" width={32} height={32} className="object-contain" />
                </div>
                <div className="hidden group-hover/sidebar:flex text-gray-400 hover:text-gray-200 items-center justify-center">
                  <PanelLeft size={20} />
                </div>
              </>
            ) : (
              <Logo />
            )}
          </button>

          {!isCollapsed && (
            <button onClick={(e) => { e.stopPropagation(); setIsCollapsed(true); }} className="text-gray-400 hover:text-gray-200 transition-colors cursor-pointer">
              <PanelLeft size={18} />
            </button>
          )}
        </div>

        {/* Dashboard Nav */}
        <nav className={`flex flex-col gap-1 mt-1 w-full ${isCollapsed ? 'items-center' : ''}`}>
            <NavItem icon={<LayoutDashboard size={18} /> } label="Dashboard" active isCollapsed={isCollapsed} />
        </nav>

        {/* Projects Nav */}
        <div className="mt-3 w-full">
          <h3 className={`text-xs font-medium text-gray-500 mb-2 whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isCollapsed ? 'max-h-0 opacity-0 m-0' : 'max-h-[20px] opacity-100 px-2.5 mt-2'
          }`}>Projects</h3>
          <nav className={`flex flex-col gap-1  w-full ${isCollapsed ? 'items-center' : ''}`}>
            <NavItem icon={<Folder size={18} />} hoverIcon={<ChevronRight size={18} />} label="All projects" isCollapsed={isCollapsed}  />
            <NavItem icon={<Star size={18} />} hoverIcon={<ChevronRight size={18} />} label="Starred" isCollapsed={isCollapsed} />
            <NavItem icon={<User size={18} />} hoverIcon={<ChevronRight size={18} />} label="Created by me" isCollapsed={isCollapsed} />
            <NavItem icon={<Users size={18} />} hoverIcon={<ChevronRight size={18} />} label="Shared with me" isCollapsed={isCollapsed} />
          </nav>
        </div>

        {/* Dynamic Recents Section */}
        <div className={`mt-4 w-full transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0 opacity-0 m-0 overflow-hidden' : 'max-h-[500px] opacity-100'
        }`}>
          <h3 className="text-xs font-medium text-gray-500 px-2.5 mb-2 whitespace-nowrap">Recents</h3>
          <nav className="flex flex-col gap-1 w-full">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <RecentItem key={index} project={project} label={project.title} setAppData={setAppData} />
              ))
            ) : (
              <p className="px-2.5 text-[12px] text-gray-600 italic">No recent projects</p>
            )}
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className={`p-3 flex flex-col gap-3 shrink-0 ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center pt-2 pb-1 ${isCollapsed ? 'justify-center' : 'justify-start px-1 w-full'} overflow-hidden`}>
          <div className="flex items-center gap-2.5 shrink-0">
            <MockUserButton />
            <div className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${
              isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[120px] opacity-100'
            }`}>
              <span className="text-[14px] font-medium text-gray-200 whitespace-nowrap">{user?.fullName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---

const NavItem = ({ icon, hoverIcon, label, active = false, isCollapsed, hasMore = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative group ${isCollapsed ? 'flex justify-center w-full' : 'w-full'}`} ref={menuRef}>
      <button
        onClick={(e) => e.stopPropagation()}
        title={isCollapsed ? label : undefined}
        className={`flex items-center transition-colors w-full cursor-pointer ${isCollapsed ? 'justify-center w-10 h-10 rounded-xl' : 'gap-3 px-2.5 py-1.5 rounded-md'} ${active ? 'bg-[#252525] text-white font-medium' : 'hover:bg-white/5 text-gray-300 font-medium'}`}
      >
        <span className={`shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'} transition-colors relative flex items-center justify-center w-[18px] h-[18px]`}>
          {hoverIcon && !isCollapsed ? (
            <>
              <span className="absolute transition-opacity duration-200 opacity-100 group-hover:opacity-0 flex items-center justify-center">{icon}</span>
              <span className="absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center">{hoverIcon}</span>
            </>
          ) : icon}
        </span>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100 w-full'}`}>
          <span className="text-sm whitespace-nowrap truncate pr-2">{label}</span>
          {hasMore && (
            <div 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
              className={`transition-opacity p-0.5 rounded shrink-0 ${isMenuOpen ? 'opacity-100 bg-white/20 text-gray-200' : 'opacity-0 group-hover:opacity-100 hover:bg-white/20 text-gray-400 hover:text-gray-200'}`}
            >
              <MoreHorizontal size={16} />
            </div>
          )}
        </div>
      </button>

      {isMenuOpen && !isCollapsed && (
        <div className="absolute top-full left-[calc(100%-32px)] mt-1 w-[170px] bg-[#1a1a1a] border border-white/5 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5">
          <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-2 text-[14px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
            <Plus size={18} className="text-gray-400" />
            <span className="font-medium">Create project</span>
          </button>
        </div>
      )}
    </div>
  );
};

const RecentItem = ({ label,project ,starred = false }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(starred);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div suppressHydrationWarning={true}>
    <div className="relative group w-full" ref={menuRef} suppressHydrationWarning={true}>
      <button 
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-white/5 text-gray-300 transition-colors w-full"
      >
        <span className="text-sm font-medium truncate pr-2">{label}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {isStarred && <Star size={14} className="text-red-400 fill-red-400 opacity-80 group-hover:opacity-100 transition-opacity" />}
          <div 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className={`transition-opacity cursor-pointer p-0.5 rounded text-gray-400 hover:text-gray-200 ${isMenuOpen ? 'opacity-100 bg-white/20' : 'opacity-0 group-hover:opacity-100 hover:bg-white/20'}`}
          >
            <MoreHorizontal size={16} />
          </div>
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-[calc(100%-32px)] mt-1 w-[190px] bg-[#1a1a1a] border border-white/5 rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5">
          
        
          <button onClick={(e) => { e.stopPropagation(); window.location.href = `/dashboard/playground/${project.id}`; setIsMenuOpen(false); }} className="flex items-center gap-3 px-2.5 py-1.5 text-[13px] text-gray-200 hover:bg-white/10 rounded-lg transition-colors w-full text-left">
            <Eye size={16} className="text-gray-400" />
            <span className="font-medium">Open Project</span>
          </button>
          {/* ... Add other menu buttons here ... */}
        </div>
      )}
    </div>
    </div>
  );
};

export default Sidebar;