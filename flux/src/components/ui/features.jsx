"use client"
import React from 'react';
import App from './test';
import IntegrationCard from './cards';

export default function CardLayout() {
  return (
    <div className="w-full max-w-[1100px]  mx-auto p-6 space-y-6 ">
      
      {/* Row 1: Two Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-[#0A0A0B] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card One</h3>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
           
           
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card Two</h3>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 h-65">
            {/* Insert content or child components here */}
            <p>Row 1 - Right Column</p>
          </div>
        </div>

      </div>

      {/* Row 2: Three Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card Three</h3>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 h-60">
            {/* Insert content or child components here */}
            <p>Row 2 - Column 1</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card Four</h3>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            <IntegrationCard/>
            
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card Five</h3>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {/* Insert content or child components here */}
            <p>Row 2 - Column 3</p>
          </div>
        </div>

      </div>

    </div>
  );
}