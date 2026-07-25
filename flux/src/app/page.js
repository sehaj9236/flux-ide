"use client"
import Navbar from "@/components/ui/navBar";
import CodeEditorWindow from "@/components/ui/codeEditor";
import OptimalHero from "@/components/ui/heroText";
import PowerfulFeatures from "@/components/ui/cardStack";
import OnboardingWorkflow from "@/components/ui/howItWorks";
import App from "@/components/ui/footer";



export default function Home() {
  return (
    <>
    <div className="h-[2000px]">
    <Navbar/>
     <OptimalHero/>
    <CodeEditorWindow/>

    <div className="mt-20"><PowerfulFeatures/></div>
    <OnboardingWorkflow/>

  <App/>
    </div>
   
    </>
   
  );
}
