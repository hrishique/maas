import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, CircleDollarSign } from "lucide-react";

const MACHINES = [
  {
    id: 1,
    name: "BTC Miner S19 Pro",
    hashrate: "110 TH/s",
    price: 0.025,
    uptime: 99.8,
    power: "3250W",
    totalNfts: 20,
    soldNfts: 5,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=S19+Pro"
  },
  {
    id: 2,
    name: "BTC Miner M30S++",
    hashrate: "112 TH/s",
    price: 0.028,
    uptime: 99.2,
    power: "3400W",
    totalNfts: 20,
    soldNfts: 12,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M30S++"
  },
  {
    id: 3,
    name: "BTC Miner Whatsminer M50",
    hashrate: "126 TH/s",
    price: 0.032,
    uptime: 98.7,
    power: "3276W",
    totalNfts: 20,
    soldNfts: 20,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M50"
  },
  {
    id: 4,
    name: "BTC Miner Avalon A1246",
    hashrate: "90 TH/s",
    price: 0.020,
    uptime: 97.5,
    power: "3010W",
    totalNfts: 20,
    soldNfts: 0,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=A1246"
  }
];

export const MachineMarketplace = () => {
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  
  const handleBuyNFT = (machine: any) => {
    setSelectedMachine(machine);
    setSelectedNFTs([]);
  };
  
  const toggleNFTSelection = (nftId: number) => {
    setSelectedNFTs(prev => {
      if (prev.includes(nftId)) {
        return prev.filter(id => id !== nftId);
      }
      return [...prev, nftId];
    });
  };
  
  const handlePurchaseComplete = () => {
    setSelectedMachine(null);
    setSelectedNFTs([]);
  };
  
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">MINT NFT</h2>
          <p className="text-muted-foreground">Purchase NFT ownership of Bitcoin mining machines</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-crypto-success rounded-full mr-1"></span>
            Available
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-1"></span>
            Sold
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MACHINES.map((machine) => {
          return (
            <Card key={machine.id} className="glass-card overflow-hidden border border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src={machine.image} alt={machine.name} className="w-full h-full object-cover" />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{machine.name}</CardTitle>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${machine.soldNfts === machine.totalNfts ? "bg-crypto-error bg-opacity-20" : "bg-crypto-success bg-opacity-20"}`}>
                    {machine.soldNfts === machine.totalNfts ? "Sold Out" : `${machine.totalNfts - machine.soldNfts}/${machine.totalNfts} Available`}
                  </div>
                </div>
                <CardDescription>Hashrate: {machine.hashrate}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <TrendingUp size={14} /> Uptime
                    </span>
                    <span>{machine.uptime}%</span>
                  </div>
                  <Progress value={machine.uptime} className="h-1.5" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <BarChart size={14} /> NFTs Minted
                    </span>
                    <span>{machine.soldNfts}/{machine.totalNfts}</span>
                  </div>
                  <Progress value={(machine.soldNfts / machine.totalNfts) * 100} className="h-1.5" />
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center">
                      <CircleDollarSign size={16} className="text-crypto-bitcoin mr-1" />
                      <span className="font-mono font-bold">{machine.price} BTC</span>
                    </div>
                    <span className="text-xs text-muted-foreground">per NFT</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                {machine.soldNfts === machine.totalNfts ? (
                  <Button variant="secondary" disabled className="w-full">Sold Out</Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => handleBuyNFT(machine)}
                  >
                    Mint NFT
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Purchase Dialog */}
      {selectedMachine && (
        <Dialog open={!!selectedMachine} onOpenChange={(open) => !open && setSelectedMachine(null)}>
          <DialogContent className="glass-card max-w-2xl">
            <DialogHeader>
              <DialogTitle>Mint NFT</DialogTitle>
              <DialogDescription>
                Select the NFT slots you want to mint for {selectedMachine.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: selectedMachine.totalNfts }).map((_, idx) => {
                  const nftId = idx + 1;
                  const isSold = nftId <= selectedMachine.soldNfts;
                  const isSelected = selectedNFTs.includes(nftId);
                  
                  return (
                    <div 
                      key={`nft-${selectedMachine.id}-${nftId}`}
                      onClick={() => !isSold && toggleNFTSelection(nftId)}
                      className={`
                        aspect-square rounded-md flex items-center justify-center text-xs font-medium border border-border/40
                        ${isSold ? 'bg-secondary cursor-not-allowed' : 
                          isSelected ? 'bg-primary/20 border-primary cursor-pointer' : 
                          'bg-primary/10 hover:bg-primary/20 cursor-pointer'}
                      `}
                    >
                      #{nftId}
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-secondary p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <span>Selected NFTs:</span>
                  <span className="font-mono">{selectedNFTs.length}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per NFT:</span>
                    <span className="font-mono">{selectedMachine.price} BTC</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-border">
                    <span>Total Cost:</span>
                    <span className="font-mono">{(selectedMachine.price * selectedNFTs.length).toFixed(5)} BTC</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="mb-1 font-medium">Expected Returns:</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Based on current network difficulty and BTC price.
                </p>
                <div className="flex justify-between items-center mb-1">
                  <span>Daily:</span>
                  <span className="font-mono">≈ 0.00005 BTC</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>Monthly:</span>
                  <span className="font-mono">≈ 0.0015 BTC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Annual:</span>
                  <span className="font-mono">≈ 0.018 BTC</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedMachine(null)}>
                Cancel
              </Button>
              <Button 
                onClick={handlePurchaseComplete}
                disabled={selectedNFTs.length === 0}
              >
                Confirm Mint ({selectedNFTs.length} NFTs)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};
