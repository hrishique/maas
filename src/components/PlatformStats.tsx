
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Activity, Award, TrendingUp } from "lucide-react";

// Simple Charts with styled divs since recharts might be overkill for this demo
const HashRateChart = () => (
  <div className="mt-4 h-40 flex items-end gap-1">
    {[60, 75, 65, 80, 90, 85, 95, 88, 92, 98, 94, 99].map((value, index) => (
      <div 
        key={index} 
        className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-sm transition-all hover:from-primary/80 hover:to-primary"
        style={{ height: `${value}%` }}
      />
    ))}
  </div>
);

const BTCMinedChart = () => (
  <div className="mt-4 h-40 flex items-end gap-1">
    {[0.3, 0.5, 0.4, 0.6, 0.55, 0.7, 0.65, 0.8, 0.75, 0.85, 0.8, 0.9].map((value, index) => (
      <div 
        key={index} 
        className="flex-1 bg-gradient-to-t from-crypto-bitcoin/50 to-crypto-bitcoin rounded-t-sm transition-all hover:from-crypto-bitcoin/80 hover:to-crypto-bitcoin"
        style={{ height: `${value * 100}%` }}
      />
    ))}
  </div>
);

// Leaderboard data
const LEADERBOARD = [
  { rank: 1, username: "satoshi_btc", rewards: 0.00952, efficiency: 99.8 },
  { rank: 2, username: "mining_master", rewards: 0.00847, efficiency: 99.4 },
  { rank: 3, username: "btc_whale", rewards: 0.00721, efficiency: 98.7 },
  { rank: 4, username: "hash_hunter", rewards: 0.00684, efficiency: 98.2 },
  { rank: 5, username: "crypto_king", rewards: 0.00593, efficiency: 97.6 }
];

export const PlatformStats = () => {
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Platform Stats & Analytics</h2>
          <p className="text-muted-foreground">Network performance and mining metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={18} />
              Hash Rate
            </CardTitle>
            <CardDescription>Platform's total mining power (TH/s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-2xl font-bold mb-2">
              6,542 <span className="text-sm font-normal text-muted-foreground">TH/s</span>
            </div>
            <HashRateChart />
            <div className="mt-2 text-right text-xs text-muted-foreground">
              Last 12 hours
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={18} className="text-crypto-bitcoin" />
              BTC Mined
            </CardTitle>
            <CardDescription>Daily platform-wide BTC rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-2xl font-bold mb-2 text-crypto-bitcoin">
              0.245 <span className="text-sm font-normal text-muted-foreground">BTC</span>
            </div>
            <BTCMinedChart />
            <div className="mt-2 text-right text-xs text-muted-foreground">
              Last 12 days
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Award size={18} />
            Top Miners Leaderboard
          </CardTitle>
          <CardDescription>Highest performing miners on the platform</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="rewards" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="rewards">Rewards Earned</TabsTrigger>
              <TabsTrigger value="efficiency">Mining Efficiency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards">
              <div className="space-y-4">
                {LEADERBOARD.map((miner) => (
                  <div key={miner.rank} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border/30">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                        ${miner.rank === 1 ? 'bg-yellow-500' : miner.rank === 2 ? 'bg-gray-400' : miner.rank === 3 ? 'bg-amber-700' : 'bg-muted'}
                      `}>
                        {miner.rank}
                      </div>
                      <div>
                        <div className="font-medium">{miner.username}</div>
                        <div className="text-xs text-muted-foreground">Rank #{miner.rank}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-crypto-bitcoin">
                      {miner.rewards.toFixed(8)} BTC
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="efficiency">
              <div className="space-y-4">
                {[...LEADERBOARD].sort((a, b) => b.efficiency - a.efficiency).map((miner, index) => (
                  <div key={miner.username} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border/30">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                        ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-muted'}
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{miner.username}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp size={12} className="text-crypto-success" />
                          Uptime
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-crypto-success">
                      {miner.efficiency.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
