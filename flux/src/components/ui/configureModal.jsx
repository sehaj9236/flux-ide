"use client"
import React, { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';

const ConfigureProjectModal = ({ isOpen, onClose, onBack, template, onCreate }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (template) {
      setProjectName(`my-${template.name.toLowerCase().replace(/\s+/g, '-')}-project`);
      setDescription(template.description || "");
    }
  }, [template]);

  // 1. Calculate word count logic
  const words = description.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isOverLimit = wordCount > 20;

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 z-[9999] pointer-events-auto">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-gray-700 rounded-xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-red-400">Configure Your Project</h2>
            <p className="text-gray-400 text-sm mt-1">{template.name} project configuration</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Project Name */}
        <label className="block text-gray-300 text-sm mb-2">Project Name</label>
        <input 
          type="text" 
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full bg-[#1C1C1E] border border-gray-700 text-white rounded-lg px-4 py-2.5 mb-6 focus:border-red-400 outline-none transition-colors" 
        />
        
        {/* Editable Description */}
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-300 text-sm">
            Description <span className="text-gray-600 font-normal">(Optional)</span>
          </label>
          {/* 2. The dynamic Word Counter */}
          <span className={`text-xs font-medium ${isOverLimit ? 'text-red-500' : 'text-emerald-500'}`}>
            {wordCount}/20 words
          </span>
        </div>
        
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full bg-[#1C1C1E] border ${isOverLimit ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg px-4 py-3 mb-6 text-sm focus:border-red-400 outline-none transition-colors italic min-h-[100px] resize-none`}
        />
        
        {/* Features Grid */}
        <div className="border border-red-500/50 bg-[#1C1C1E]/50 rounded-xl p-5 mb-8">
          <h3 className="text-gray-300 text-sm font-medium mb-4">Selected Template Features</h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {template.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                <Zap size={14} className="text-red-400" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="px-4 py-2 text-gray-400 cursor-pointer hover:text-white transition-colors">Back</button>
          <button 
            onClick={() => onCreate({ projectName, description })} 
            // 3. Disable the create button if over limit
            disabled={isOverLimit}
            className={`px-6 py-2 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] ${
              isOverLimit 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-red-400 hover:bg-red-500 cursor-pointer text-white'
            }`}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureProjectModal;