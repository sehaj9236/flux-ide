"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedOut,UserButton, useUser } from "@clerk/nextjs";

export default function OptimalHero() {
  const words = ["Teams"," Devs"," Builders"];
  const [index, setIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  const {  isSignedIn } = useUser();
  

  useEffect(() => {
    if (words.length === 0) return;
    let timer;
    const word = words[index] || '';

    const tick = () => {
      if (!isDeleting) {
        const next = word.substring(0, subText.length + 1);
        setSubText(next);
        setSpeed(100);
        if (next === word) {
          setSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        const next = word.substring(0, subText.length - 1);
        setSubText(next);
        setSpeed(45);
        if (next === '') {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          setSpeed(350);
        }
      }
    };

    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, index, words, speed]);

  return (
    <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden mt-10 ">
      <div className="relative z-10 max-w-5xl px-6 mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl md:text-[5.2rem] font-bold tracking-tight text-center leading-[1.08] text-${theme === 'dark' ? 'white' : 'slate-900'} max-w-4xl">
          <span className="block">Collaborative Cloud Code Editor</span>
          <span className="block">
            for Real-Time   
            <span style={{ color: '#00a86b' }}>{ subText}</span>
            <span className="inline-block w-[3px] h-[0.8em] bg-current ml-1 animate-pulse" style={{ color: '#00a86b' }} />
          </span>
        </h1>
        <div className="mt-10 flex flex-row items-center justify-center gap-4">
<Link
      href={isSignedIn ? "/dashboard" : "/sign-up"}
      className="rounded-full w-35 h-11 bg-[#00a86b] pt-3 text-sm text-white cursor-pointer hover:bg-[#01BF90]"
    >
      Get Started
    </Link>
        </div>
      </div>
    </section>
  );
}