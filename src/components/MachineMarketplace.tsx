
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BarChart, TrendingUp, CircleDollarSign } from "lucide-react";

// Sample mining machines data
const MACHINES = [
  {
    id: 1,
    name: "BTC Miner S19 Pro",
    hashrate: "110 TH/s",
    price: 0.025,
    uptime: 99.8,
    power: "3250W",
    capacity: 100,
    owned: 15,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=S19+Pro"
  },
  {
    id: 2,
    name: "BTC Miner M30S++",
    hashrate: "112 TH/s",
    price: 0.028,
    uptime: 99.2,
    power: "3400W",
    capacity: 100,
    owned: 0,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M30S++"
  },
  {
    id: 3,
    name: "BTC Miner Whatsminer M50",
    hashrate: "126 TH/s",
    price: 0.032,
    uptime: 98.7,
    power: "3276W",
    capacity: 100,
    owned: 5,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M50"
  },
  {
    id: 4,
    name: "BTC Miner Avalon A1246",
    hashrate: "90 TH/s",
    price: 0.020,
    uptime: 97.5,
    power: "3010W",
    capacity: 100,
    owned: 0,
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=A1246"
  }
];

export const MachineMarketplace = () => {
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [purchasePercentage, setPurchasePercentage] = useState(10);
  
  const handleBuyFraction = (machine: any) => {
    setSelectedMachine(machine);
    // Calculate a default percentage based on available capacity
    const defaultPercentage = Math.min(25, 100 - machine.owned);
    setPurchasePercentage(defaultPercentage);
  };
  
  const handlePurchaseComplete = () => {
    // Here you would typically interact with the blockchain
    // For now, just close the dialog
    setSelectedMachine(null);
  };
  
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Machine Marketplace</h2>
          <p className="text-muted-foreground">Purchase fractions of Bitcoin mining machines</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-crypto-success rounded-full mr-1"></span>
            Available
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-crypto-warning rounded-full mr-1"></span>
            Partial
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-crypto-error rounded-full mr-1"></span>
            Sold Out
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MACHINES.map((machine) => {
          const availabilityColor = machine.owned === 100 
            ? "bg-crypto-error" 
            : machine.owned > 0 ? "bg-crypto-warning" : "bg-crypto-success";
          
          return (
            <Card key={machine.id} className="glass-card overflow-hidden border border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img src={machine.image} alt={machine.name} className="w-full h-full object-cover" />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{machine.name}</CardTitle>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${availabilityColor} bg-opacity-20`}>
                    {machine.owned === 100 ? "Sold Out" : "Available"}
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
                      <BarChart size={14} /> Capacity
                    </span>
                    <span>{100 - machine.owned}% Available</span>
                  </div>
                  <Progress value={100 - machine.owned} className="h-1.5" />
                  
                  {machine.owned > 0 && (
                    <div className="bg-secondary/50 p-2 rounded-md text-xs">
                      You own: <span className="font-medium text-primary">{machine.owned}%</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center">
                      <CircleDollarSign size={16} className="text-crypto-bitcoin mr-1" />
                      <span className="font-mono font-bold">{machine.price} BTC</span>
                    </div>
                    <span className="text-xs text-muted-foreground">per 1% share</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className="w-full" 
                  disabled={machine.owned === 100}
                  variant={machine.owned === 100 ? "secondary" : "default"}
                  onClick={() => handleBuyFraction(machine)}
                >
                  {machine.owned === 100 ? "Sold Out" : "Buy Fraction"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Purchase Dialog */}
      {selectedMachine && (
        <Dialog open={!!selectedMachine} onOpenChange={(open) => !open && setSelectedMachine(null)}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Purchase Mining Share</DialogTitle>
              <DialogDescription>
                You are purchasing a fraction of {selectedMachine.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Share Percentage</span>
                  <span className="font-mono font-bold">{purchasePercentage}%</span>
                </div>
                <Slider
                  min={1}
                  max={100 - selectedMachine.owned}
                  step={1}
                  value={[purchasePercentage]}
                  onValueChange={(value) => setPurchasePercentage(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum available: {100 - selectedMachine.owned}%
                </p>
              </div>
              
              <div className="rounded-md bg-secondary p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Price per 1%:</span>
                  <span className="font-mono">{selectedMachine.price} BTC</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Quantity:</span>
                  <span className="font-mono">{purchasePercentage}%</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost:</span>
                    <span className="font-mono font-bold">
                      {(selectedMachine.price * purchasePercentage).toFixed(5)} BTC
                    </span>
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
              <Button onClick={handlePurchaseComplete}>
                Confirm Purchase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};
