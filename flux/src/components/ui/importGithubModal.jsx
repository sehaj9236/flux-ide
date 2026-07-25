"use client"
import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

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

const ImportGithubModal = ({ isOpen, onClose, onImport, isLoading }) => {
  const [repoUrl, setRepoUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      onImport(repoUrl.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-[9999] pointer-events-auto">
      <div className="w-full max-w-lg bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Background glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 opacity-[0.03] rounded-full blur-[80px] -mr-20 -mt-20"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1F0F0F] rounded-xl border border-red-500/30 flex items-center justify-center text-red-400">
              <GithubIcon size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Import Repository</h2>
              <p className="text-gray-400 text-xs mt-1">Bring your existing code into Flux</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10">
          <label className="block text-gray-300 text-sm mb-2 font-medium">GitHub URL</label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <LinkIcon size={16} />
            </div>
            <input 
              type="url" 
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
              className="w-full bg-[#161618] border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:border-red-400 focus:ring-1 focus:ring-red-400/50 outline-none transition-all placeholder:text-gray-600" 
            />
          </div>
          
          {/* Footer */}
          <div className="flex justify-end gap-3 mt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 text-sm text-gray-400 cursor-pointer hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading || !repoUrl}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                isLoading || !repoUrl 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-400 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(248,113,113,0.2)] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <GithubIcon size={16} />
                  Import Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportGithubModal;