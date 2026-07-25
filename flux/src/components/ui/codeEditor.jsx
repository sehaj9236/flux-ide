"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  File, 
  Folder, 
  Terminal as TerminalIcon, 
  Play, 
  Settings, 
  Plus, 
  Minus, 
  Send, 
  Sparkles, 
  Flame, 
  Layers, 
  ExternalLink, 
  FileCode, 
  RefreshCw,
  Clock,
  Bug,
  Layout,
  ChevronRight,
  ChevronDown,
  Database,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Globe,
  Search,
  Settings2,
  Terminal,
  Activity,
  User,
  GitBranch,
  ShieldAlert,
  Sliders,
  History,
  BookOpen,
  ArrowRight,
  Monitor,
  Check
} from 'lucide-react';

const STACK_CONFIGS = {
  react: {
    name: 'React (Vite)',
    iconColor: '#61DAFB',
    logo: (
      <svg className="w-4 h-4 text-[#61DAFB] animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L11 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H10v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    files: {
      'src/App.jsx': {
        lang: 'jsx',
        content: `import React, { useState } from 'react';\nimport './App.css';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="flex flex-col items-center justify-center p-8 bg-[#0D0E11] text-white rounded-xl shadow-lg border border-zinc-800">\n      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Hello Vite + React!</h1>\n      <p className="text-zinc-400 mb-6">Interactive live counter preview state synced in real-time.</p>\n      <button \n        onClick={() => setCount(count + 1)} \n        className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition-all text-black font-semibold rounded-lg shadow-lg shadow-cyan-500/20"\n      >\n        Count is: {count}\n      </button>\n    </div>\n  );\n}`
      },
      'src/main.jsx': {
        lang: 'javascript',
        content: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`
      },
      'src/index.css': {
        lang: 'css',
        content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  background-color: #0b0c0e;\n  font-family: system-ui, sans-serif;\n}`
      },
      'package.json': {
        lang: 'json',
        content: `{\n  "name": "vite-react-app",\n  "private": true,\n  "version": "0.1.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0"\n  },\n  "devDependencies": {\n    "vite": "^6.0.0"\n  }\n}`
      }
    },
    activeFile: 'src/App.jsx',
    terminal: [
      { type: 'command', text: 'npm run dev' },
      { type: 'info', text: '  VITE v6.0.2  ready in 186 ms' },
      { type: 'info', text: '' },
      { type: 'success', text: '  ➜  Local:   http://localhost:5173/' },
      { type: 'info', text: '  ➜  Network: use --host to expose' },
      { type: 'success', text: '  ➜  press h + enter to show help' }
    ]
  },
  hono: {
    name: 'Hono (Edge API)',
    iconColor: '#E26D5C',
    logo: (
      <svg className="w-4 h-4 text-[#E26D5C]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v4h2v-4h3V9h-8v2h3z"/>
      </svg>
    ),
    files: {
      'src/index.ts': {
        lang: 'typescript',
        content: `import { Hono } from 'hono'\n\nconst app = new Hono()\n\n// Inline JSON payload dynamic route\napp.get('/api/greet', (c) => {\n  const name = c.req.query('name') || 'Guest'\n  return c.json({\n    ok: true,\n    message: \`Welcome to Hono Edge Web Server, \${name}!\`,\n    timestamp: Date.now(),\n    runtime: 'Cloudflare Workers / Deno / Bun'\n  })\n})\n\nexport default app`
      },
      'wrangler.toml': {
        lang: 'toml',
        content: `name = "hono-edge-api"\nmain = "src/index.ts"\ncompatibility_date = "2026-06-24"`
      },
      'package.json': {
        lang: 'json',
        content: `{\n  "name": "hono-api",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "wrangler dev src/index.ts"\n  },\n  "dependencies": {\n    "hono": "^4.0.0"\n  }\n}`
      }
    },
    activeFile: 'src/index.ts',
    terminal: [
      { type: 'command', text: 'bun run dev' },
      { type: 'info', text: '⛅️ wrangler 3.42.0' },
      { type: 'info', text: '-------------------' },
      { type: 'success', text: '✔ [b0] Ready on http://localhost:8787' },
      { type: 'info', text: '✔ [b0] Local compilation complete. Hot module replacement enabled.' }
    ]
  },
  nextjs: {
    name: 'Next.js 15',
    iconColor: '#FFFFFF',
    logo: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9L7.5 12h3.5zm2.5 0V11l2-2.5h-2zm-5-5L7.5 10v2h1z"/>
      </svg>
    ),
    files: {
      'app/page.tsx': {
        lang: 'typescript',
        content: `import Image from 'next/image';\n\nexport default function Home() {\n  return (\n    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">\n      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">\n        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-zinc-800 bg-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-800/30 lg:p-4">\n          Get started by editing&nbsp;\n          <code className="font-bold">app/page.tsx</code>\n        </p>\n      </div>\n\n      <div className="relative flex place-items-center">\n        <h1 className="text-6xl font-extrabold tracking-tight">Next.js 15</h1>\n      </div>\n\n      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">\n        <a href="#" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30">\n          <h2 className="mb-3 text-2xl font-semibold">Docs <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span></h2>\n          <p className="m-0 max-w-[30ch] text-sm opacity-50">Find in-depth information about Next.js features.</p>\n        </a>\n      </div>\n    </main>\n  );\n}`
      },
      'app/layout.tsx': {
        lang: 'typescript',
        content: `import './globals.css'\n\nexport const metadata = {\n  title: 'Next.js Collaborative App',\n  description: 'Generated by flux.dev',\n}\n\nexport default function RootLayout({\n  children,\n}: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}`
      },
      'package.json': {
        lang: 'json',
        content: `{\n  "name": "nextjs-collab-app",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build"\n  },\n  "dependencies": {\n    "next": "^15.0.0",\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0"\n  }\n}`
      }
    },
    activeFile: 'app/page.tsx',
    terminal: [
      { type: 'command', text: 'bun run dev' },
      { type: 'info', text: '▲ Next.js 15.0.0' },
      { type: 'info', text: '  - Local:        http://localhost:3000' },
      { type: 'info', text: '  - Environments: .env' },
      { type: 'info', text: '' },
      { type: 'success', text: '✓ ready - started server on 0.0.0.0:3000, url: http://localhost:3000' },
      { type: 'success', text: '✓ compiled client and server successfully' }
    ]
  },
  angular: {
    name: 'Angular v18',
    iconColor: '#DD0031',
    logo: (
      <svg className="w-4 h-4 text-[#DD0031]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 5.91l1.52 12.18L12 22l8.48-3.91L22 5.91 12 2zm5.73 14.15l-1.39-3.23H7.66l-1.39 3.23H4.14L12 3.91l7.86 12.24h-2.13z"/>
      </svg>
    ),
    files: {
      'src/app/app.component.ts': {
        lang: 'typescript',
        content: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [],\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.css']\n})\nexport class AppComponent {\n  title = 'Angular Workspace';\n  version = '18.0.0';\n  isLoaded = true;\n}`
      },
      'src/app/app.component.html': {
        lang: 'html',
        content: `<div class="p-8 bg-[#151216] border border-[#ff3254]/20 rounded-xl max-w-lg text-white">\n  <div class="flex items-center gap-3 mb-4">\n    <div class="w-10 h-10 rounded-full bg-[#DD0031] flex items-center justify-center font-bold">A</div>\n    <h1 class="text-2xl font-bold">Welcome to {{ title }}!</h1>\n  </div>\n  <p class="text-zinc-400 text-sm leading-relaxed mb-6">Running on Angular Standalone Component engine with Next-gen Ivy compilers.</p>\n  <div class="flex items-center gap-2 text-xs bg-[#241B20] px-3 py-1.5 rounded-lg text-pink-400 border border-pink-500/10">\n    <span>Ivy Engine:</span>\n    <strong className="text-[#ff5074]">Active (v{{ version }})</strong>\n  </div>\n</div>`
      },
      'package.json': {
        lang: 'json',
        content: `{\n  "name": "angular-app",\n  "version": "0.0.0",\n  "scripts": {\n    "ng": "ng",\n    "start": "ng serve"\n  },\n  "dependencies": {\n    "@angular/common": "^18.0.0",\n    "@angular/core": "^18.0.0",\n    "rxjs": "~7.8.0"\n  }\n}`
      }
    },
    activeFile: 'src/app/app.component.ts',
    terminal: [
      { type: 'command', text: 'ng serve' },
      { type: 'info', text: '✔ Browser application bundle generation complete.' },
      { type: 'info', text: 'Initial Chunk Files   | Names         | Raw Size' },
      { type: 'info', text: 'main.js               | main          | 228.32 kB | ' },
      { type: 'info', text: 'styles.css            | styles        |  98.15 kB | ' },
      { type: 'success', text: '** Angular Live Development Server is listening on localhost:4200 **' }
    ]
  },
  vue: {
    name: 'Vue 3 (Vite)',
    iconColor: '#42B883',
    logo: (
      <svg className="w-4 h-4 text-[#42B883]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3.5 16.5h4L12 10.5l4.5 6h4L12 2zm0 5l5 8.5h-10L12 7z"/>
      </svg>
    ),
    files: {
      'src/App.vue': {
        lang: 'html',
        content: `<script setup>\nimport { ref } from 'vue'\n\nconst framework = ref('Vue 3')\nconst speedText = ref('Ultra Fast')\nconst status = ref(true)\n</script>\n\n<template>\n  <div class="p-8 bg-[#0D1210] border border-[#42B883]/20 rounded-xl max-w-md text-white">\n    <h1 class="text-2xl font-bold mb-2 flex items-center gap-2 text-[#42B883]">\n      {{ framework }} + Composition API\n    </h1>\n    <p class="text-zinc-400 text-sm mb-4">Experience lightning reactive reactivity with Vite.</p>\n    <button @click="status = !status" class="px-5 py-2 rounded-lg font-medium text-xs bg-[#42B883] hover:bg-[#3ca675] text-black transition-all shadow-md">\n      State Switcher ({{ status ? 'ON' : 'OFF' }})\n    </button>\n  </div>\n</template>`
      },
      'src/main.js': {
        lang: 'javascript',
        content: `import { createApp } from 'vue'\nimport App from './App.vue'\nimport './style.css'\n\ncreateApp(App).mount('#app')`
      },
      'package.json': {
        lang: 'json',
        content: `{\n  "name": "vite-vue-app",\n  "version": "3.0.0",\n  "scripts": {\n    "dev": "vite"\n  },\n  "dependencies": {\n    "vue": "^3.4.0"\n  }\n}`
      }
    },
    activeFile: 'src/App.vue',
    terminal: [
      { type: 'command', text: 'npm run dev' },
      { type: 'info', text: '  VITE v6.0.2  ready in 124 ms' },
      { type: 'info', text: '' },
      { type: 'success', text: '  ➜  Local:   http://localhost:5173/' },
      { type: 'info', text: '  ➜  Network: use --host to expose' }
    ]
  }
};

export default function CollaborativeEditor() {
  const workspaceRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Current dev stack: 'react' | 'hono' | 'nextjs' | 'angular' | 'vue'
  const [activeStack, setActiveStack] = useState('react'); 
  
  // Active custom file selected in sidebar for the active stack
  const [selectedFile, setSelectedFile] = useState('src/App.jsx');
  
  // Custom states for Live Previews
  const [reactCount, setReactCount] = useState(0);
  const [reactHistory, setReactHistory] = useState([
    { event: 'Initial Render', count: 0, timestamp: '12:00:00' }
  ]);
  const [honoParamName, setHonoParamName] = useState('Workspace Partner');
  const [honoApiResponse, setHonoApiResponse] = useState(null);
  const [vueStatus, setVueStatus] = useState(true);
  const [vueInputData, setVueInputData] = useState('Reactive Workspace');
  const [angLoaded, setAngLoaded] = useState(true);
  
  // View mode toggle state ('code' or 'preview')
  const [viewMode, setViewMode] = useState('code');

  // Dropdown UI selection toggle state
  const [isStackDropdownOpen, setIsStackDropdownOpen] = useState(false);

  // Maya's state (Tracks the user's mouse inside the workspace)
  const [mayaPos, setMayaPos] = useState({ x: 420, y: 190 });
  const [isHovering, setIsHovering] = useState(false);

  // Jules's state (Simulated peer movement inside the workspace)
  const [julesPos, setJulesPos] = useState({ x: 480, y: 310 });
  
  // Peer actions log & dynamic interactions state
  const [peerActivity, setPeerActivity] = useState('Jules is idle');

  const handleStackChange = (stackId) => {
    setActiveStack(stackId);
    setSelectedFile(STACK_CONFIGS[stackId].activeFile);
    setIsStackDropdownOpen(false);
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStackDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Maya following the actual mouse pointer (Restricted to workspace container)
  const handleMouseMove = (e) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    setMayaPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const activities = [
      'Jules is editing configurations',
      'Jules is reviewing live rendering',
      'Jules updated component properties',
      'Jules is running compilation checks',
      'Jules is debugging edge middleware API requests',
      'Jules is idle'
    ];
    
    const interval = setInterval(() => {
      if (!workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      
      const minX = 60; 
      const maxX = Math.max(250, rect.width - 150);
      const minY = 50;
      const maxY = Math.max(150, rect.height - 100);

      setJulesPos({
        x: Math.floor(Math.random() * (maxX - minX) + minX),
        y: Math.floor(Math.random() * (maxY - minY) + minY),
      });

      // Random peer activity log change
      const randomAct = activities[Math.floor(Math.random() * activities.length)];
      setPeerActivity(randomAct);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const triggerHonoSimulatedRequest = () => {
    setHonoApiResponse({
      ok: true,
      message: `Welcome to Hono Edge Web Server, ${honoParamName}!`,
      timestamp: Date.now(),
      runtime: 'Deno Deploy (V8 Isolation Node)',
      requestDetails: {
        method: 'GET',
        path: `/api/greet?name=${encodeURIComponent(honoParamName)}`,
        agent: 'Flux-DevSandbox-Client/1.0',
        secure: true
      },
      headers: {
        'content-type': 'application/json',
        'server': 'hono-edge-agent',
        'cache-control': 'no-cache',
        'x-powered-by': 'Hono-Engine-v4'
      }
    });
  };

  // Trigger default hono API render on stack change
  useEffect(() => {
    if (activeStack === 'hono') {
      triggerHonoSimulatedRequest();
    }
  }, [activeStack, honoParamName]);

  // Handle local state tracking logs for React Counter
  const handleReactCountChange = (val) => {
    const nextVal = reactCount + val;
    setReactCount(nextVal);
    const dateStr = new Date().toTimeString().split(' ')[0];
    setReactHistory(prev => [
      { event: val > 0 ? 'Count Incremented' : 'Count Decremented', count: nextVal, timestamp: dateStr },
      ...prev.slice(0, 4)
    ]);
  };

  // Read config data
  const currentStackData = STACK_CONFIGS[activeStack];
  const fileContents = currentStackData.files[selectedFile] || { lang: 'text', content: 'No file active' };

  const renderHighlightedCode = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const elements = line.split(/(\s+)/).map((segment, segIdx) => {
        if (/^(import|export|const|let|function|return|default|class|extends|from|export default function)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#C678DD] font-semibold">{segment}</span>;
        }
        if (/^(".*?"|'.*?'|`.*?`)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#98C379]">{segment}</span>;
        }
        if (/^(App|Home|AppComponent|Component|Hono|createApp|ref|useState|useRef)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#61AFEF]">{segment}</span>;
        }
        if (/^(div|p|h1|button|main|template|script|code|a|html|body|a|a)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#E06C75]">{segment}</span>;
        }
        if (/^(className|styleUrls|standalone|imports|templateUrl|name|compatibility_date|selector|main)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#D19A66]">{segment}</span>;
        }
        if (/^(true|false|0|1|2|3|4|5|6|7|8|9)/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#D19A66]">{segment}</span>;
        }
        if (/^[{}<>[\]().,;=+\-*/]/.test(segment.trim())) {
          return <span key={segIdx} className="text-[#56B6C2]">{segment}</span>;
        }
        return <span key={segIdx} className="text-[#ABB2BF]">{segment}</span>;
      });

      return (
        <div key={idx} className="flex min-h-[1.5rem]">
          <span className="text-zinc-600 text-right pr-6 select-none w-10 shrink-0 font-mono text-[11px] border-r border-zinc-900/40 mr-4">
            {idx + 1}
          </span>
          <span className="whitespace-pre font-mono text-xs md:text-[13px]">{elements}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden border border-zinc-800/80 bg-[#0F0F10] font-sans text-sm text-[#9095A3] select-none">
      
      {/* CSS Injection for Custom Editor-grade Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        /* General Custom Scrollbar (Sidebar, Preview, UI elements) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0F0F10;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a; /* zinc-800 */
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46; /* zinc-700 */
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #27272a #0F0F10;
        }

        /* Dark Editor Workspace Scrollbar (Matches the dark code field background) */
        .code-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .code-scrollbar::-webkit-scrollbar-track {
          background: #0b0c0d;
        }
        .code-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2024;
          border-radius: 9999px;
          border: 2px solid #0b0c0d;
        }
        .code-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2e3037;
        }
        .code-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1f2024 #0b0c0d;
        }
      `}} />

      {/* WINDOW HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-[#0F0F10] border-b border-zinc-900/60 gap-3">
        {/* macOS Window Dots & Active Stack Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-semibold">
            {currentStackData.logo}
            <span>Workspace: {currentStackData.name}</span>
          </div>
        </div>

        {/* CONTROLS AREA (DROPDOWN AND PREVIEW TOGGLE) */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          
          {/* STACK SWITCHER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsStackDropdownOpen(!isStackDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#161618] hover:bg-[#1f1f22] border border-zinc-800 text-zinc-200 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              {currentStackData.logo}
              <span className="truncate max-w-[100px] sm:max-w-[130px]">{currentStackData.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isStackDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isStackDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg bg-[#141416] border border-zinc-800 shadow-2xl z-50 py-1 font-sans animate-[fadeIn_0.15s_ease-out]">
                <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 tracking-wider uppercase border-b border-zinc-900 mb-1">
                  Change Tech Stack
                </div>
                {Object.keys(STACK_CONFIGS).map((stackId) => {
                  const config = STACK_CONFIGS[stackId];
                  const isCurrent = activeStack === stackId;
                  return (
                    <button
                      key={stackId}
                      onClick={() => handleStackChange(stackId)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${
                        isCurrent 
                          ? 'bg-zinc-850 text-white font-semibold' 
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {config.logo}
                        <span>{config.name}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#00C292]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* PREVIEW TOGGLE BUTTON */}
          <button
            onClick={() => setViewMode(viewMode === 'code' ? 'preview' : 'code')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
              viewMode === 'preview' 
                ? 'bg-[#00C292]/10 border-[#00C292]/30 text-[#00C292] hover:bg-[#00C292]/20 shadow-md shadow-[#00C292]/5' 
                : 'bg-[#161618] border-zinc-800 text-zinc-300 hover:bg-[#1f1f22]'
            }`}
          >
            {viewMode === 'code' ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#00C292]" />
                <span>Preview</span>
              </>
            ) : (
              <>
                <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                <span>View Source</span>
              </>
            )}
          </button>
        </div>

        {/* Multi-user Avatars & Interactive State Logs */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block text-[11px] font-mono text-zinc-500 px-2 bg-zinc-900/60 rounded py-0.5 border border-zinc-800/40">
            {peerActivity}
          </div>
          <div className="flex items-center -space-x-1.5 text-[10px] font-bold text-white tracking-wider">
            <div className="w-6 h-6 rounded-full bg-[#00C292] text-black flex items-center justify-center ring-2 ring-[#0F0F10] cursor-help" title="Maya (You)">MY</div>
            {viewMode === 'code' && (
              <div className="w-6 h-6 rounded-full bg-[#FF2E93] text-white flex items-center justify-center ring-2 ring-[#0F0F10] cursor-help animate-pulse" title="Jules (Peer Developer)">JL</div>
            )}
          </div>
        </div>
      </div>

      {/* INNER LAYOUT CONTAINER */}
      <div className="flex flex-col lg:flex-row lg:h-[700px] min-h-[640px] items-stretch">
        
        {/* SIDEBAR EXPLORER */}
        <div className="w-full lg:w-56 bg-[#0F0F10] p-4 border-r border-zinc-900/50 font-mono text-xs cursor-default shrink-0 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-4 px-2">
              <span>Explorer</span>
              <span className="text-[9px] lowercase text-zinc-600">click file</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2 pl-2">
              <Folder className="w-4 h-4 text-zinc-500" />
              <span className="tracking-wide">workspace</span>
            </div>
            
            <div className="space-y-1 ml-4 pl-1 border-l border-zinc-900/80">
              {Object.keys(currentStackData.files).map((fileName) => {
                const isSelected = selectedFile === fileName;
                return (
                  <div
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#1C1C1E] text-white font-medium border-l-2 border-[#00C292] shadow-sm' 
                        : 'text-zinc-400 hover:bg-[#151517] hover:text-zinc-200'
                    }`}
                  >
                    <File className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00C292]' : 'text-zinc-500'}`} />
                    <span className="truncate">{fileName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ENVIRONMENT METRICS OVERVIEW */}
          <div className="mt-8 pt-4 border-t border-zinc-900/60 px-2 space-y-3">
            <div className="text-[10px] font-bold text-zinc-600 tracking-wider uppercase">Sandbox Agent</div>
            <div className="space-y-1.5 font-sans text-[11px] text-zinc-500 bg-[#121214] p-2.5 rounded-lg border border-zinc-900/40">
              <div className="flex justify-between">
                <span>CPU Speed:</span>
                <span className="text-zinc-300 font-mono">0.02ms lag</span>
              </div>
              <div className="flex justify-between">
                <span>Runtime:</span>
                <span className="text-[#00C292] font-mono font-semibold">Bun Edge</span>
              </div>
              <div className="flex justify-between">
                <span>Hot Reload:</span>
                <span className="text-[#00C292] font-mono">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* EDITOR & PREVIEW AREA */}
        <div 
          ref={workspaceRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="flex-1 flex flex-col bg-[#0F0F10] relative overflow-hidden h-full min-h-0"
          style={{ cursor: isHovering ? 'none' : 'default' }}
        >
          
          {/* CUSTOM CURSORS (MAYA & JULES) */}
          {/* Maya Cursor (Follows real mouse across entire workspace scope) */}
          <div 
            className="absolute pointer-events-none z-50 transition-opacity duration-75"
            style={{ left: `${mayaPos.x}px`, top: `${mayaPos.y}px`, opacity: isHovering ? 1 : 0 }}
          >
            <svg className="w-4 h-4 text-[#00C292] transform -rotate-90 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
            </svg>
            <div className="bg-[#00C292] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ml-2 -mt-1 shadow-md whitespace-nowrap">
              Maya (You)
            </div>
          </div>

          {/* JULES CURSOR */}
          {viewMode === 'code' && (
            <div 
              className="absolute pointer-events-none z-50 transition-all duration-1000 ease-in-out"
              style={{ left: `${julesPos.x}px`, top: `${julesPos.y}px` }}
            >
              <svg className="w-4 h-4 text-[#FF2E93] transform -rotate-90 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
              </svg>
              <div className="bg-[#FF2E93] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ml-2 -mt-1 shadow-md whitespace-nowrap">
                Jules (Peer)
              </div>
            </div>
          )}

          {/* DYNAMIC VIEW CONTENT CONDITION */}
          {viewMode === 'code' ? (
            /* CODE TEXT WINDOW */
            <div className="flex-1 p-6 font-mono text-xs md:text-sm leading-relaxed overflow-y-auto overflow-x-auto bg-[#0b0c0d] h-full min-h-0 code-scrollbar">
              <div className="flex flex-col space-y-1">
                {renderHighlightedCode(fileContents.content)}
              </div>
            </div>
          ) : (
            /* FULL-BLEED SANDBOX PREVIEWS - Takes up 100% of the editor container space with no margin */
            <div className="flex-1 bg-zinc-950 flex flex-col font-sans relative overflow-y-auto min-h-0 w-full transition-all duration-300 custom-scrollbar">
              
              {/* STACK PREVIEW: React Full-Screen Developer Console */}
              {activeStack === 'react' && (
                <div className="w-full min-h-full flex flex-col bg-[#0b0d10] text-white">
                  {}
                  {/* Dashboard Header Bar */}
                  <div className="bg-[#0e1116] border-b border-zinc-900 py-3.5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none">React Live Counter</h4>
                        <span className="text-[10px] text-zinc-500 font-mono">localhost:5173 / count-dashboard</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-semibold text-zinc-400">Live Synced</span>
                    </div>
                  </div>

                  {/* Complete Workspace Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-900/60">
                    
                    {/* Left Pane: Interactive State Modifiers */}
                    <div className="md:col-span-5 p-6 flex flex-col justify-between bg-[#0e1116]/40">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase block mb-1">State Sandbox</span>
                        <h3 className="text-lg font-bold text-white mb-2">Reactivity Controller</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                          Simulate complex counter behaviors by incrementing and decrementing live states in this sandbox dashboard.
                        </p>

                        <div className="bg-[#12161d] rounded-xl p-6 border border-zinc-800/80 mb-6 text-center shadow-lg">
                          <span className="text-xs text-zinc-500 font-mono block mb-1">CURRENT ATOMIC STATE</span>
                          <span className="text-6xl font-black text-cyan-400 font-mono leading-none tracking-tight">{reactCount}</span>
                        </div>

                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleReactCountChange(-1)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-300 font-medium text-xs transition-all cursor-pointer border border-zinc-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                            <span>Decrement</span>
                          </button>
                          <button 
                            onClick={() => handleReactCountChange(1)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-black font-extrabold text-xs transition-all cursor-pointer shadow-md shadow-cyan-500/15"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Increment</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-zinc-900 text-xs text-zinc-500 flex items-center justify-between">
                        <span>React Hooks active: useState</span>
                        <button 
                          onClick={() => { setReactCount(0); setReactHistory([]); }}
                          className="hover:text-white text-[11px] underline font-mono flex items-center gap-1 cursor-pointer"
                        >
                          Reset count state
                        </button>
                      </div>
                    </div>

                    {/* Right Pane: Live Audit Trail / Performance Logs */}
                    <div className="md:col-span-7 p-6 flex flex-col bg-[#0b0d10]">
                      <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase block mb-1">Reactive History</span>
                      <h4 className="text-sm font-semibold text-white mb-4">Atomic State Mutations log</h4>
                      
                      <div className="flex-1 space-y-2.5 overflow-y-auto">
                        {reactHistory.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-[#0f1217] border border-zinc-900 text-xs font-mono">
                            <div className="flex items-center gap-2.5">
                              <span className={`h-2 w-2 rounded-full ${log.count >= 0 ? 'bg-cyan-500' : 'bg-red-400'}`}></span>
                              <span className="text-zinc-300 font-medium">{log.event}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                              <span>state: <b className="text-cyan-400 font-bold">{log.count}</b></span>
                              <span>{log.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STACK PREVIEW: Hono Full-Bleed API Client Console */}
              {activeStack === 'hono' && (
                <div className="w-full min-h-full flex flex-col bg-[#0e0e10] text-white">
                  {}
                  {/* Header API Path Selector */}
                  <div className="bg-[#121215] border-b border-zinc-900 py-3 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#E26D5C] text-black font-extrabold text-[10px] px-2 py-1 rounded">GET</span>
                      <span className="font-mono text-xs text-zinc-300">http://localhost:8787/api/greet</span>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono">
                      <span className="text-zinc-500">Host:</span>
                      <span className="text-[#E26D5C]">Bun / Cloudflare Edge Worker</span>
                    </div>
                  </div>

                  {/* Interactive Client Workspace Split Pane */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-900">
                    {/* Left Params Configuration Form */}
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Query String Parameters</h4>
                        <p className="text-xs text-zinc-500">Configure parameters passed to the dynamic hono API endpoint container.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900">
                          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Parameter Name</label>
                          <div className="flex gap-2">
                            <span className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono rounded-lg text-zinc-500 flex items-center">?name=</span>
                            <input 
                              type="text" 
                              value={honoParamName}
                              onChange={(e) => setHonoParamName(e.target.value)}
                              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-[#E26D5C]"
                              placeholder="Guest"
                            />
                          </div>
                        </div>

                        <button
                          onClick={triggerHonoSimulatedRequest}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-[#E26D5C] hover:bg-[#d45e4d] text-black font-bold text-xs rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch API Request</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Response JSON Visualizer Pane */}
                    <div className="p-6 bg-[#0a0a0c] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-white">HTTP Response Panel</h4>
                          {honoApiResponse && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2.5 py-1 rounded border border-emerald-500/10 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                              200 OK Status
                            </span>
                          )}
                        </div>

                        {honoApiResponse ? (
                          <pre className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 font-mono text-xs text-[#98C379] overflow-x-auto leading-relaxed max-h-[300px]">
                            {JSON.stringify(honoApiResponse, null, 2)}
                          </pre>
                        ) : (
                          <div className="text-center py-12 text-zinc-600 font-mono text-xs border border-dashed border-zinc-900 rounded-xl">
                            Send request to capture API response payload...
                          </div>
                        )}
                      </div>

                      {honoApiResponse && (
                        <div className="mt-4 pt-4 border-t border-zinc-900/60 font-mono text-[10px] text-zinc-500 flex justify-between">
                          <span>Payload Size: ~245 bytes</span>
                          <span>Duration: 1.2ms (Zero Cold Start)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STACK PREVIEW: Next.js 15 Full-Bleed Application Front-end */}
              {activeStack === 'nextjs' && (
                <div className="w-full min-h-full bg-black text-white flex flex-col justify-between relative overflow-hidden">
                  {}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Header/Navbar */}
                  <div className="border-b border-zinc-900 bg-black/50 py-3.5 px-6 flex items-center justify-between z-10 sticky top-0 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-black text-lg tracking-tighter">NEXT</span>
                      <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded font-mono text-zinc-400 uppercase">v15.0</span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-zinc-400">
                      <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
                      <span className="hover:text-white cursor-pointer transition-colors">Templates</span>
                      <span className="hover:text-white cursor-pointer transition-colors">Showcase</span>
                    </div>
                    <button className="bg-white hover:bg-zinc-200 transition-colors text-black text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer">
                      Deploy App
                    </button>
                  </div>

                  {/* Hero Layout Content */}
                  <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-center px-6 py-12 text-center z-10">
                    <span className="text-[10px] font-bold tracking-widest text-[#6B63FF] uppercase block mb-3">Live Static App Compilation</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                      Next.js Server-Side Engine
                    </h2>
                    <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed mb-8">
                      Experience optimal page loading speeds through automatic server-side rendering, layout nesting, and pre-rendering bundles on-the-fly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
                      <div className="bg-[#0b0b0d] p-5 rounded-2xl border border-zinc-900 text-left hover:border-zinc-800 transition-colors">
                        <span className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 mb-3 font-bold text-xs font-mono">01</span>
                        <h4 className="text-xs font-bold text-zinc-300 mb-1">Layout Nested</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">Optimally scoped layout structures cached seamlessly.</p>
                      </div>
                      <div className="bg-[#0b0b0d] p-5 rounded-2xl border border-zinc-900 text-left hover:border-zinc-800 transition-colors">
                        <span className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 mb-3 font-bold text-xs font-mono">02</span>
                        <h4 className="text-xs font-bold text-zinc-300 mb-1">Static Generation</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">Fast, static web content delivered direct from Edge Servers.</p>
                      </div>
                      <div className="bg-[#0b0b0d] p-5 rounded-2xl border border-zinc-900 text-left hover:border-zinc-800 transition-colors">
                        <span className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 mb-3 font-bold text-xs font-mono">03</span>
                        <h4 className="text-xs font-bold text-zinc-300 mb-1">API Routes</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">Deploy REST APIs directly within your serverless backend directory.</p>
                      </div>
                    </div>
                  </div>

                  {/* Footing Status Bar */}
                  <div className="border-t border-zinc-900 py-3 px-6 bg-zinc-950/80 z-10 text-xs text-zinc-500 flex justify-between">
                    <span>Listening on port 3000</span>
                    <span>Status: Dynamic Page Render Synced</span>
                  </div>
                </div>
              )}

              {/* STACK PREVIEW: Angular IVY Compiler Engine */}
              {activeStack === 'angular' && (
                <div className="w-full min-h-full flex flex-col bg-[#110F12] text-white">
                  {}
                  {/* Top Compiler Action Strip */}
                  <div className="bg-[#181418] border-b border-[#ff3254]/10 py-3.5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#DD0031]/10 flex items-center justify-center text-[#DD0031] border border-[#ff3254]/25">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 5.91l1.52 12.18L12 22l8.48-3.91L22 5.91 12 2zm5.73 14.15l-1.39-3.23H7.66l-1.39 3.23H4.14L12 3.91l7.86 12.24h-2.13z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Angular Ivy Performance Analyzer</h4>
                        <span className="text-[10px] text-[#FF859C] font-mono leading-none">Standalone Engine: v18.0.0</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs text-zinc-400 font-mono font-semibold">IVY Active</span>
                    </div>
                  </div>

                  {/* Expanded Full-Bleed Compiler Metrics Content Layout (Refined to address layout from image_6079fe.png) */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#ff3254]/10">
                    
                    {/* Left Pane: Compiler Details & Active Directive State */}
                    <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#151216]">
                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-bold text-[#DD0031] uppercase tracking-widest block mb-1">Compiler Metrics</span>
                          <h3 className="text-xl font-bold text-white">Ivy Standalone Engine</h3>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Compiling declarative HTML components into high performance structural Javascript models using the next-generation Ivy engine compilation pipeline.
                          </p>
                        </div>

                        {/* Interactive Loaded Toggle Component Simulation */}
                        <div className="bg-[#1D171E] border border-[#ff3254]/10 rounded-xl p-5 space-y-4 shadow-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-300">COMPONENT DIRECTIVE</span>
                            <span className="text-[10px] bg-[#DD0031]/10 text-[#FF859C] px-2 py-0.5 rounded-md border border-[#ff3254]/20 font-mono">
                              standalone: true
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400">Class Signature:</span>
                            <span className="font-mono text-zinc-300 font-semibold">AppComponent</span>
                          </div>

                          <div className="pt-3 border-t border-zinc-900 flex justify-between items-center">
                            <span className="text-xs text-zinc-400">Simulation Status:</span>
                            <button 
                              onClick={() => setAngLoaded(!angLoaded)}
                              className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all font-bold cursor-pointer ${
                                angLoaded ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                              }`}
                            >
                              {angLoaded ? 'ACTIVE / LOADED' : 'PAUSED'}
                            </button>
                          </div>
                        </div>

                        <div className="bg-[#1D171E] border border-[#ff3254]/10 rounded-xl p-5 text-left shadow-lg">
                          <span className="text-[10px] text-zinc-500 font-bold block mb-1.5 uppercase">COMPILER ENGINE BINDING</span>
                          <span className="text-xs text-zinc-300 font-mono block">Template: Url mapping</span>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">Rendering Backend:</span>
                            <span className="text-xs text-pink-400 font-mono bg-pink-950/20 px-2 py-0.5 rounded border border-pink-500/10 font-bold">Ivy Backend</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-zinc-600 font-mono pt-6 border-t border-zinc-900/60">
                        * Ivy compilations are fully cached.
                      </div>
                    </div>

                    {/* Right Pane: Live Build Console Output Stream */}
                    <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#110F12]">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase block mb-1">IVY ENGINE LOGSTREAM</span>
                        <h4 className="text-xs font-semibold text-zinc-400">Latest build cycle logs</h4>

                        <div className="bg-[#1c161d] rounded-xl p-4 border border-[#ff3254]/10 font-mono text-xs text-zinc-300 space-y-2 max-h-[340px] overflow-y-auto leading-relaxed">
                          <div className="text-emerald-400">✔ Ivy compiler started validation of 4 standalone modules.</div>
                          <div className="text-zinc-500">[12:45:01] Processing Angular compiler decorators...</div>
                          <div className="text-zinc-500">[12:45:01] Creating isolated standalone injector trees...</div>
                          <div className="text-zinc-300">✔ AppComponent matched selectors. Generating HTML bindings...</div>
                          <div className="text-pink-400 font-bold">[Ivy Engine] Compilation Complete in 38ms. Chunk size: 228kb.</div>
                          <div className="text-[#ff3254]/80">● Live Preview synchronization listening on process sockets.</div>
                        </div>
                      </div>

                      <div className="bg-[#181418] border border-[#ff3254]/5 rounded-xl p-4 flex items-center gap-3 mt-4">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0"></span>
                        <span className="text-xs text-zinc-400 leading-normal font-mono">Compilation engine is connected. Sync state synced in real-time.</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STACK PREVIEW: Vue Composition Tree Inspector */}
              {activeStack === 'vue' && (
                <div className="w-full min-h-full flex flex-col bg-[#0b0e0d] text-white">
                  {}
                  {/* Vue Head Row */}
                  <div className="bg-[#0e1311] border-b border-[#42B883]/10 py-3.5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#42B883]/10 flex items-center justify-center text-[#42B883]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L3.5 16.5h4L12 10.5l4.5 6h4L12 2zm0 5l5 8.5h-10L12 7z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Vue 3 Composition Terminal</h4>
                        <span className="text-[10px] text-[#42B883] font-mono leading-none font-semibold">Active State System</span>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">Composition Model</span>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#42B883]/10">
                    
                    {/* Left Vue Reactive Control Desk */}
                    <div className="p-6 flex flex-col justify-between bg-[#0e1311]/40">
                      <div>
                        <span className="text-[10px] font-bold text-[#42B883] uppercase tracking-widest block mb-1">State Variable</span>
                        <h3 className="text-lg font-bold text-white mb-2">Reactivity Bindings</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                          Vue 3 proxies component states to enable instant re-rendering without deep visual diff recalculations. Set values below to test live proxies.
                        </p>

                        <div className="space-y-4">
                          <div className="bg-[#121916] rounded-xl p-5 border border-[#42B883]/10">
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Ref String Proxy value</label>
                            <input 
                              type="text" 
                              value={vueInputData}
                              onChange={(e) => setVueInputData(e.target.value)}
                              className="w-full bg-[#0d1210] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-[#42B883]/40"
                              placeholder="Reactive data input..."
                            />
                          </div>

                          <div className="bg-[#121916] rounded-xl p-5 border border-[#42B883]/10 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-zinc-300 font-bold block">Ref Switch Status</span>
                              <span className="text-[10px] text-zinc-500">Triggers lifecycle updates</span>
                            </div>
                            <button
                              onClick={() => setVueStatus(!vueStatus)}
                              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                                vueStatus ? 'bg-[#42B883] text-black font-bold' : 'bg-zinc-850 text-zinc-400 border border-zinc-800'
                              }`}
                            >
                              Status: {vueStatus ? 'ON' : 'OFF'}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-zinc-500 font-mono pt-4 border-t border-zinc-900">
                        Composition API ref() compiler variables ready.
                      </div>
                    </div>

                    {/* Right Vue Virtual Proxy visual state rendering */}
                    <div className="p-6 bg-[#0a0d0c] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase block mb-1">Active Reactive View</span>
                        <h4 className="text-sm font-semibold text-white mb-4">Compiled Real-time Output</h4>

                        <div className="p-8 rounded-2xl bg-[#0e1512] border border-[#42B883]/20 text-center shadow-lg space-y-4">
                          <h1 className="text-2xl font-extrabold text-[#42B883]">
                            {vueInputData || 'Vue 3'} + Composition API
                          </h1>
                          <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                            Experience lightning-fast reactive synchronization with Vite ES module bundling compilation directly within our online collaborative code compiler workspace.
                          </p>
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#14231b] border border-[#42B883]/15 text-xs text-[#42B883]">
                            <span>State status switcher value: </span>
                            <strong className="font-bold">{vueStatus ? 'ACTIVE' : 'STANDBY'}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex justify-between">
                        <span>Reactive proxies active: 2</span>
                        <span>Hot sync delay: 0.1ms</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* INTEGRATED TERMINAL - Hidden in "Preview Mode" to grant 100% full-bleed height space for live apps */}
          {viewMode === 'code' && (
            <div className="border-t border-zinc-900/60 bg-[#0A0A0B] p-5 font-mono text-[11px] space-y-1.5 transition-all duration-300 shrink-0">
              {}
              <div className="text-zinc-500 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>TERMINAL CONSOLE</span>
                </div>
                <span className="text-[10px] text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">sandbox@agent</span>
              </div>
              
              <div className="pt-2">
                {currentStackData.terminal.map((line, idx) => {
                  if (line.type === 'command') {
                    return (
                      <div key={idx} className="flex items-center gap-2 text-white">
                        <span className="text-[#00C292]">➔</span>
                        <span className="font-bold">{line.text}</span>
                      </div>
                    );
                  }
                  if (line.type === 'success') {
                    return (
                      <div key={idx} className="text-emerald-400 flex items-center gap-1">
                        <span>✓</span>
                        <span>{line.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="text-zinc-400">
                      {line.text}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-zinc-500 pt-1">
                <span className="text-[#00C292] animate-pulse">●</span>
                <span>listening on live agent process socket...</span>
                <span className="w-1.5 h-3.5 bg-zinc-700 animate-pulse inline-block align-middle"></span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}