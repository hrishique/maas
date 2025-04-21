
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/Header";
import { MachineMarketplace } from "@/components/MachineMarketplace";
import { MyMachines } from "@/components/MyMachines";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { PlatformStats } from "@/components/PlatformStats";
import { Sidebar, MobileSidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("marketplace");
  const isMobile = useIsMobile();
  
  // Update document title based on active section
  useEffect(() => {
    const sectionTitles: Record<string, string> = {
      marketplace: "Marketplace | MaaS Platform",
      mymachines: "My Machines | MaaS Platform",
      rewards: "Rewards | MaaS Platform",
      stats: "Platform Stats | MaaS Platform"
    };
    
    document.title = sectionTitles[activeSection] || "MaaS Platform";
  }, [activeSection]);
  
  // Render the active section component
  const renderSection = () => {
    switch (activeSection) {
      case "marketplace":
        return <MachineMarketplace />;
      case "mymachines":
        return <MyMachines />;
      case "rewards":
        return <RewardsDashboard />;
      case "stats":
        return <PlatformStats />;
      default:
        return <MachineMarketplace />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {isMobile ? (
        <>
          <MobileSidebar 
            onNavigate={setActiveSection} 
            activeSection={activeSection} 
          />
          <Header />
          <main className="flex-1 container mx-auto px-4">
            {renderSection()}
          </main>
          <Footer />
        </>
      ) : (
        <div className="flex">
          <Sidebar 
            onNavigate={setActiveSection} 
            activeSection={activeSection} 
          />
          <div className="flex-1 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-6">
              {renderSection()}
            </main>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
