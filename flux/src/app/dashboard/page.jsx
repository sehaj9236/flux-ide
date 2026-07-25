"use client"
import App from "@/components/ui/dashboardMain";
import Sidebar from "@/components/ui/dashboardSidebar";
import { useState, useEffect } from "react";

// TODO: Import your new Project Component here!
// import ProjectPlayground from "@/components/ui/ProjectPlayground"; 

export default function Page() {
  const [appData, setAppData] = useState(() => {
     if (typeof window !== "undefined") {
       const savedData = localStorage.getItem("my-projects");
       return savedData ? JSON.parse(savedData) : [];
     }
     return [];
  });

  const [activeView, setActiveView] = useState("dashboard");
  
  // NEW: State to hold the specific project the user just clicked
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("my-projects", JSON.stringify(appData));
    }
  }, [appData]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <div className="h-full">
        <Sidebar 
          projects={appData} 
          setAppData={setAppData} 
          activeView={activeView}
          setActiveView={setActiveView}
        /> 
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* CONDITIONAL RENDERING: Show the project OR the dashboard list */}
        {activeView === 'project' && activeProject ? (
          
          <div className="p-8 text-white">
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mb-6 text-emerald-500 hover:text-emerald-400 font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            
            {/* Replace everything below this with your actual Project Component */}
            <div className="bg-[#0F0F10] border border-white/5 p-6 rounded-2xl">
              <h1 className="text-3xl font-bold mb-2">{activeProject.title}</h1>
              <p className="text-gray-400 mb-6">{activeProject.description}</p>
              <div className="p-10 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500">
                Your new component pops up here!
              </div>
            </div>
            {/* End of placeholder */}
            
          </div>

        ) : (
          
          <App 
            appData={appData} 
            setAppData={setAppData} 
            activeView={activeView}
            // Pass these down so App can trigger the view change when a project is clicked
            setActiveView={setActiveView}
            setActiveProject={setActiveProject}
          />
          
        )}
      </div>
    </div>
  );
}