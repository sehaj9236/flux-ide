"use client";
import { createContext, useContext, useState, useEffect } from "react";

// 1. We create the empty backpack
const ProjectContext = createContext(null);

// 2. We set up the rules for the backpack 
export function ProjectProvider({ children }) {
  const [appData, setAppData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("my-projects");
      return savedData ? JSON.parse(savedData) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("my-projects", JSON.stringify(appData));
    }
  }, [appData]);

  return (
    <ProjectContext.Provider value={{ appData, setAppData }}>
      {children}
    </ProjectContext.Provider>
  );
}

// 3. A quick shortcut for your files to reach into the backpack
export function useProjects() {
  return useContext(ProjectContext);
}