"use client";

import React, { useState } from "react";
import { Plus, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignedOut,UserButton, useUser } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";

const Logo = () => (
  <Link href="/">
    <div className="flex items-center gap-3">
      <img src="/flux-logo-Photoroom.png" alt="Flux Logo" width={40} height={40} />
     
    </div>
  </Link>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-[#e9e5e5] px-3 py-1.5 rounded-lg hover:text-white transition-colors"
  >
    {children}
  </a>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <div className="rounded-full border border-white/10 bg-[#0A0A0B] px-6  py-3   ">
        <div className="flex justify-between items-center">
          <Logo />

          <nav className="hidden md:flex items-center gap-2 text-[15px]">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#features">Workflow</NavLink>
             
            <Link
  href="https://github.com/sehaj9236/flux"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[#e9e5e5] hover:text-white transition-colors ml-2"
>
  <FaGithub size={21} />
</Link>
          </nav>

         <div className="hidden md:flex items-center gap-3">
  {!isLoaded ? (
    <div className="h-10 w-10 rounded-full bg-zinc-800 animate-pulse" />
  ) : !isSignedIn ? (
    <>
      <Link
        href="/sign-in"
        className="text-sm text-[#e9e5e5] hover:text-white"
      >
        Sign In
      </Link>

      <Link
        href="/sign-up"
        className="rounded-full  px-5 py-2 text-sm  text-white bg-[#00a86b] hover:bg-[#01BF90]"
      >
        Get Started
      </Link>
    </>
  ) : (
    <UserButton />
  )}
</div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}