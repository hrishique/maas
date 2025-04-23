
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/Header";
import { MachineMarketplace } from "@/components/MachineMarketplace";
import { NFTMarketplace } from "@/components/NFTMarketplace";
import { MyMachines } from "@/components/MyMachines";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { PlatformStats } from "@/components/PlatformStats";
import { Sidebar, MobileSidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Index = () => {
  const [activeSection, setActiveSection] = useState("marketplace");
  const [activeMarketplaceTab, setActiveMarketplaceTab] = useState("mint");
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
  
  // Render the marketplace section with tabs
  const renderMarketplace = () => {
    return (
      <div className="space-y-6">
        <Tabs value={activeMarketplaceTab} onValueChange={setActiveMarketplaceTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="mint">Mint NFT</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
          <TabsContent value="mint">
            <MachineMarketplace />
          </TabsContent>
          <TabsContent value="marketplace">
            <NFTMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  // Render the active section component
  const renderSection = () => {
    switch (activeSection) {
      case "marketplace":
        return renderMarketplace();
      case "mymachines":
        return <MyMachines />;
      case "rewards":
        return <RewardsDashboard />;
      case "stats":
        return <PlatformStats />;
      default:
        return renderMarketplace();
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
