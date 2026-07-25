"use client"
import App from "@/components/ui/dashboardMain";
import Sidebar from "@/components/ui/dashboardSidebar";
import { useState,useEffect } from "react";

export default function Page() {
  // Move your state and useEffect here
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
    <div className="flex h-screen overflow-hidden">
      <div className="h-full">
        {/* Pass appData to Sidebar */}
        <Sidebar projects={appData} setAppData={setAppData} /> 
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Pass appData and the setter to App */}
        <App appData={appData} setAppData={setAppData} />
      </div>
    </div>
  );
}