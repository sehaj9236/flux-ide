import React from 'react';

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
}