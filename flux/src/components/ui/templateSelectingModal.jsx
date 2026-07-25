"use client"
import { ChevronRight, Search, Clock, Check } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const TemplateModal = ({ isOpen = true, onClose, onSubmit = () => {} }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedTemplateId(null);
      setActiveFilter('All');
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setSelectedTemplateId(null);
    setActiveFilter('All');
    setSearchQuery(''); 
    onClose();
  };

  const templates = [
    {
      id: "react",
      name: "React",
      description: "A JavaScript library for building user interfaces with component-based architecture",
      icon: "/react.svg",
      color: "#61DAFB",
      popularity: 5,
      tags: ["UI", "Frontend", "JavaScript"],
      features: ["Component-Based", "Virtual DOM", "JSX Support"],
      category: "frontend",
    },
    {
      id: "nextjs",
      name: "Next_js",
      description: "The React framework for production with server-side rendering and static site generation",
      icon: "/nextjs-icon.svg",
      color: "#000000",
      popularity: 4,
      tags: ["React", "SSR", "Fullstack"],
      features: ["Server Components", "API Routes", "File-based Routing"],
      category: "fullstack",
    },
    {
      id: "express",
      name: "Express",
      description: "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
      icon: "/expressjs-icon-white.svg",
      color: "#000000",
      popularity: 4,
      tags: ["Node.js", "API", "Backend"],
      features: ["Middleware", "Routing", "HTTP Utilities"],
      category: "backend",
    },
    {
      id: "vue",
      name: "Vue_js",
      description: "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
      icon: "/vuejs-icon.svg",
      color: "#4FC08D",
      popularity: 4,
      tags: ["UI", "Frontend", "JavaScript"],
      features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
      category: "frontend",
    },
    {
      id: "hono",
      name: "Hono",
      description: "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
      icon: "/hono.svg",
      color: "#e36002",
      popularity: 3,
      tags: ["Node.js", "TypeScript", "Backend"],
      features: ["Dependency Injection", "TypeScript Support", "Modular Architecture"],
      category: "backend",
    },
    {
      id: "angular",
      name: "Angular",
      description: "Angular is a web framework that empowers developers to build fast, reliable applications.",
      icon: "/angular-2.svg",
      color: "#DD0031",
      popularity: 3,
      tags: ["React", "Fullstack", "JavaScript"],
      features: ["Reactive Data Binding", "Component System", "Virtual DOM", "Dependency Injection", "TypeScript Support"],
      category: "frontend", 
    },
  ];

const filteredTemplates = templates.filter((template) => {
    const matchesCategory = activeFilter === 'All' || template.category.toLowerCase() === activeFilter.toLowerCase();
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch = template.name.toLowerCase().includes(lowerCaseQuery) || template.description.toLowerCase().includes(lowerCaseQuery) || template.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
    return matchesCategory && matchesSearch;
  });

  // --- FIXED: Now passes data to parent ---
  const handleContinue = () => {
    if (selectedTemplateId) {
      const templateData = templates.find(t => t.id === selectedTemplateId);
      onSubmit(templateData); 
    }
  };

  const renderStars = (popularity) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= popularity ? (
            <svg 
              key={star} 
              viewBox="0 0 24 24" 
              className="w-4 h-4 text-red-400 fill-current"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <svg 
              key={star} 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 text-red-400 stroke-current"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 font-sans z-50">
      <div className="w-full max-w-3xl bg-[#0A0A0A] border border-gray-700 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 relative shrink-0">
          <button 
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-1 text-gray-400 cursor-pointer hover:text-white transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-red-400 flex items-center gap-2">
            <span>+</span> Select a Template
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Choose a template to create your new playground
          </p>
        </div>

        {/* Search & Filters */}
        <div className="px-6 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // UPDATED: Added border border-[#333]
              className="w-full bg-[#0F0F10] text-white border border-[#333] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          {/* UPDATED: Added border border-[#333] */}
          <div className="flex bg-[#0F0F10] border border-[#333] rounded-lg p-1 w-full sm:w-auto">
            {['All', 'Frontend', 'Backend', 'Fullstack'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-sm rounded-md transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#404040] text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="px-6 overflow-y-auto custom-scrollbar flex-1 min-h-0 pb-4">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
              {filteredTemplates.map((template) => (
             <div
  key={template.id}
  onClick={() => setSelectedTemplateId(prev => prev === template.id ? null : template.id)}
  className={`relative bg-[#0F0F10] border transition-all duration-300 rounded-xl p-4 flex gap-4 cursor-pointer ${
    selectedTemplateId === template.id 
      ? 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.25)]' 
      : 'border-[#333] hover:border-red-400/60 hover:shadow-[0_0_15px_rgba(248,113,113,0.1)]' 
  }`}
>
  {/* UPDATED TICK BADGE */}
  {selectedTemplateId === template.id && (
    <div className="absolute top-2 left-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center z-10">
      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
    </div>
  )}

  <div className="flex-shrink-0 ml-6"> {/* Added ml-6 to accommodate the absolute badge */}
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center border shadow-inner overflow-hidden"
      style={{ 
        backgroundColor: `${template.color}20`, 
        borderColor: `${template.color}50` 
      }}
    >
      <img 
        src={template.icon} 
        alt={`${template.name} icon`} 
        className="w-6 h-6 object-contain" 
      />
    </div>
  </div>
                  
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold text-lg leading-tight">{template.name}</h3>
                      </div>
                      {renderStars(template.popularity)}
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-snug mb-4 flex-1">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full border border-[#444] bg-[#2a2a2a] text-gray-300 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Search className="w-12 h-12 opacity-20 mb-4" />
              <p>No templates found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-[#0F0F10] rounded-b-xl flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex items-center text-gray-400 text-sm gap-2">
            <Clock className="w-4 h-4 opacity-70" />
            <span>
              Estimated setup time: <span className="text-gray-200">
                {selectedTemplateId ? '1-2 minutes' : 'Select a template'}
              </span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleCloseModal}
              className="flex-1 sm:flex-none px-4 py-2 cursor-pointer rounded-lg border border-gray-600 text-gray-300 hover:bg-[#7E2A2A] hover:text-white transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleContinue}
              disabled={!selectedTemplateId}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1 ${
                selectedTemplateId 
                  ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                  : 'bg-[#ef4444]/50 text-white/70 cursor-not-allowed'
              }`}
            >
              Continue 
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>

      </div>

      {/* Global styles for custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a4a4a;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default TemplateModal;