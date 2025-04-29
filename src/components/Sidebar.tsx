
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, CircleDollarSign, BarChart, Activity, Wallet, Tag, ShoppingCart } from "lucide-react";
import { Logo } from "./Logo";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start mb-1 ${active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
};

interface SidebarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

// Fetch BTC price from CoinGecko API
const useBtcPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch BTC price");
        }
        
        const data = await response.json();
        setPrice(data.bitcoin.usd);
        setPriceChange(data.bitcoin.usd_24h_change);
        setError(null);
      } catch (err) {
        console.error("Error fetching BTC price:", err);
        setError("Failed to fetch price");
      } finally {
        setLoading(false);
      }
    };

    fetchBtcPrice();

    // Refresh price every 60 seconds
    const interval = setInterval(fetchBtcPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return { price, priceChange, loading, error };
};

export const Sidebar = ({ onNavigate, activeSection }: SidebarProps) => {
  const { price, priceChange, loading, error } = useBtcPrice();
  
  return (
    <div className="w-64 p-4 border-r border-border/40 h-screen sticky top-0 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-8">
        <Logo size={32} />
        <h1 className="text-xl font-bold text-gradient">MaaS</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xs uppercase text-muted-foreground mb-2 px-4">Dashboard</h3>
          <NavItem 
            icon={<Tag size={18} />} 
            label="Mint NFT" 
            active={activeSection === "marketplace"}
            onClick={() => onNavigate("marketplace")}
          />
          <NavItem 
            icon={<ShoppingCart size={18} />} 
            label="NFT Marketplace" 
            active={activeSection === "nftmarket"}
            onClick={() => onNavigate("nftmarket")}
          />
          <NavItem 
            icon={<BarChart size={18} />} 
            label="My Machines" 
            active={activeSection === "mymachines"}
            onClick={() => onNavigate("mymachines")}
          />
          <NavItem 
            icon={<CircleDollarSign size={18} />} 
            label="Rewards" 
            active={activeSection === "rewards"}
            onClick={() => onNavigate("rewards")}
          />
          <NavItem 
            icon={<Activity size={18} />} 
            label="Platform Stats" 
            active={activeSection === "stats"}
            onClick={() => onNavigate("stats")}
          />
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-muted-foreground mb-2 px-4">Account</h3>
          <NavItem 
            icon={<Wallet size={18} />} 
            label="Connect Wallet" 
            active={false}
            onClick={() => {}}
          />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="p-4 rounded-lg glass-card space-y-2">
          <div className="text-sm font-medium">Current BTC Price</div>
          {loading ? (
            <div className="h-8 w-full animate-pulse rounded bg-muted"></div>
          ) : error ? (
            <div className="font-mono text-lg font-bold text-red-500">Error loading price</div>
          ) : (
            <>
              <div className="font-mono text-lg font-bold text-gradient">
                ${price?.toLocaleString()}
              </div>
              <div className={`text-xs flex items-center ${priceChange && priceChange >= 0 ? 'text-crypto-success' : 'text-crypto-error'}`}>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="mr-1"
                  style={{ transform: priceChange && priceChange < 0 ? 'rotate(180deg)' : 'none' }}
                >
                  <path d="M12 20V4M5 11l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {priceChange ? `${Math.abs(priceChange).toFixed(2)}%` : "0.00%"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const MobileSidebar = ({ onNavigate, activeSection }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { price, priceChange, loading, error } = useBtcPrice();
  
  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };
  
  return (
    <>
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      
      <div className={`
        fixed inset-0 z-40 bg-background transition-transform transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <h1 className="text-xl font-bold text-gradient">MaaS</h1>
            </div>
            
            <button 
              className="p-2 rounded-md bg-secondary/50"
              onClick={() => setIsOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-2 px-4">Dashboard</h3>
              <NavItem 
                icon={<Tag size={18} />} 
                label="Mint NFT" 
                active={activeSection === "marketplace"}
                onClick={() => handleNavigate("marketplace")}
              />
              <NavItem 
                icon={<ShoppingCart size={18} />} 
                label="NFT Marketplace" 
                active={activeSection === "nftmarket"}
                onClick={() => handleNavigate("nftmarket")}
              />
              <NavItem 
                icon={<BarChart size={18} />} 
                label="My Machines" 
                active={activeSection === "mymachines"}
                onClick={() => handleNavigate("mymachines")}
              />
              <NavItem 
                icon={<CircleDollarSign size={18} />} 
                label="Rewards" 
                active={activeSection === "rewards"}
                onClick={() => handleNavigate("rewards")}
              />
              <NavItem 
                icon={<Activity size={18} />} 
                label="Platform Stats" 
                active={activeSection === "stats"}
                onClick={() => handleNavigate("stats")}
              />
            </div>
            
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-2 px-4">Account</h3>
              <NavItem 
                icon={<Wallet size={18} />} 
                label="Connect Wallet" 
                active={false}
                onClick={() => {}}
              />
            </div>
          </div>
          
          <div className="mt-auto mb-4">
            <div className="p-4 rounded-lg glass-card space-y-2">
              <div className="text-sm font-medium">Current BTC Price</div>
              {loading ? (
                <div className="h-8 w-full animate-pulse rounded bg-muted"></div>
              ) : error ? (
                <div className="font-mono text-lg font-bold text-red-500">Error loading price</div>
              ) : (
                <>
                  <div className="font-mono text-lg font-bold text-gradient">
                    ${price?.toLocaleString()}
                  </div>
                  <div className={`text-xs flex items-center ${priceChange && priceChange >= 0 ? 'text-crypto-success' : 'text-crypto-error'}`}>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="mr-1"
                      style={{ transform: priceChange && priceChange < 0 ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M12 20V4M5 11l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {priceChange ? `${Math.abs(priceChange).toFixed(2)}%` : "0.00%"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
