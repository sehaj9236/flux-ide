"use client"
import Link from 'next/link';
import React from 'react';
import { SignedOut,UserButton, useUser } from "@clerk/nextjs";
import Tooltip from './icons';




const Logo = () => (
  <Link href="/">
    <div className="flex items-center gap-3">
      <img src="/flux-logo-Photoroom.png" alt="Flux Logo" width={40} height={40} />
     
    </div>
  </Link>
);
export default function App() {
  const {  isSignedIn } = useUser();
  return (
    <div className="  flex flex-col font-sans text-center md:text-left">
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-24">
        <h1 className="text-[#F5F5F5] text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 max-w-3xl text-center">
          Ready to Build Something Amazing?
        </h1>
        
        <p className="text-[#8E8E93] text-base md:text-lg lg:text-[19px] mb-10 md:mb-12 text-center">
          Join developers creating, collaborating, and shipping faster with a modern cloud-powered coding workspace.  
        </p>
        
        <div className="flex flex-row items-center justify-center gap-4">
          <Link
      href={isSignedIn ? "/dashboard" : "/sign-up"}
     
    >
       <button className="px-6 py-3 rounded-full border border-[#333333]  cursor-pointer text-white bg-[#00a86b] hover:bg-[#01BF90] text-[15px] font-medium  transition-colors duration-200">
            Get Started
          </button>
    </Link>
        </div>
      </div>

      <footer className="w-full  border-t border-[#222222] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Logo/>
              <span className="text-[#F5F5F5] font-bold text-[27px] tracking-wider">Flux</span>
            </div>
            <p className="text-[#8E8E93] text-[15px] leading-relaxed text-center md:text-left">
A full-stack cloud-based collaborative code editor built with Next.js, Express, Prisma, and PostgreSQL, featuring real-time code synchronization and seamless developer collaboration.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start mt-2">
            
        <Tooltip/>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#222222] text-[14px] text-[#666666]">
          <div className="text-center md:text-left">
            Built by <span className="text-[#8E8E93]">Sehaj Sharma</span> • Nextjs • Express • Prisma • PostgreSQL
          </div>
          <div>
            © 2026 Flux Editor
          </div>
        </div>
      </footer>

    </div>
  );
}