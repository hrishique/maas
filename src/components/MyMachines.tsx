
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart, TrendingUp } from "lucide-react";

// Sample data for user's machines
const USER_MACHINES = [
  {
    id: 1,
    name: "BTC Miner S19 Pro",
    hashrate: "110 TH/s",
    ownership: 15,
    totalMined: 0.00342,
    currentBalance: 0.00089,
    efficiency: 96.4,
    uptime: 99.8,
    lastReward: "2 hours ago"
  },
  {
    id: 3,
    name: "BTC Miner Whatsminer M50",
    hashrate: "126 TH/s",
    ownership: 5,
    totalMined: 0.00121,
    currentBalance: 0.00041,
    efficiency: 94.8,
    uptime: 98.7,
    lastReward: "5 hours ago"
  }
];

export const MyMachines = () => {
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">My Mining Machines</h2>
          <p className="text-muted-foreground">Manage your mining investments</p>
        </div>
      </div>
      
      {USER_MACHINES.length > 0 ? (
        <div className="space-y-6">
          {USER_MACHINES.map((machine) => (
            <Card key={machine.id} className="glass-card border border-border/50 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{machine.name}</CardTitle>
                    <CardDescription>Hashrate: {machine.hashrate}</CardDescription>
                  </div>
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {machine.ownership}% Ownership
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="stats" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="stats">Performance</TabsTrigger>
                    <TabsTrigger value="rewards">Rewards</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stats" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Activity size={14} /> Efficiency
                          </span>
                          <span>{machine.efficiency}%</span>
                        </div>
                        <Progress value={machine.efficiency} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <TrendingUp size={14} /> Uptime
                          </span>
                          <span>{machine.uptime}%</span>
                        </div>
                        <Progress value={machine.uptime} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="stats-card p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">
                          Your Effective Hashrate
                        </div>
                        <div className="font-mono font-bold">
                          {parseFloat(machine.hashrate) * (machine.ownership / 100)} TH/s
                        </div>
                      </div>
                      
                      <div className="stats-card p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">
                          Last Reward
                        </div>
                        <div className="font-mono font-bold">
                          {machine.lastReward}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rewards" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="stats-card p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">
                          Total BTC Mined
                        </div>
                        <div className="font-mono font-bold text-crypto-bitcoin">
                          {machine.totalMined.toFixed(8)} BTC
                        </div>
                      </div>
                      
                      <div className="stats-card p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">
                          Current Balance
                        </div>
                        <div className="font-mono font-bold text-crypto-bitcoin">
                          {machine.currentBalance.toFixed(8)} BTC
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/40 p-3 rounded-md text-sm">
                      <div className="mb-2 font-medium">Projected Earnings</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary/40 p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Daily</div>
                          <div className="font-mono text-xs">
                            {(machine.totalMined / 90).toFixed(8)} BTC
                          </div>
                        </div>
                        <div className="bg-secondary/40 p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Weekly</div>
                          <div className="font-mono text-xs">
                            {(machine.totalMined / 13).toFixed(8)} BTC
                          </div>
                        </div>
                        <div className="bg-secondary/40 p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">Monthly</div>
                          <div className="font-mono text-xs">
                            {(machine.totalMined / 3).toFixed(8)} BTC
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <BarChart size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">No Mining Machines Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't purchased any mining machine shares. Visit the marketplace to start mining.
          </p>
        </div>
      )}
    </section>
  );
};
