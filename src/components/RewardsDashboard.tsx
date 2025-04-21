
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleDollarSign, TrendingUp, Download } from "lucide-react";

// Sample transaction history
const TRANSACTIONS = [
  {
    id: "tx1",
    date: "2023-04-15",
    amount: 0.00056,
    type: "Mining Reward",
    status: "Completed",
    time: "14:32:45"
  },
  {
    id: "tx2",
    date: "2023-04-10",
    amount: 0.00064,
    type: "Mining Reward",
    status: "Completed",
    time: "09:15:22"
  },
  {
    id: "tx3",
    date: "2023-04-05",
    amount: 0.00072,
    type: "Withdrawal",
    status: "Completed",
    time: "17:48:10"
  },
  {
    id: "tx4",
    date: "2023-03-28",
    amount: 0.00048,
    type: "Mining Reward",
    status: "Completed",
    time: "11:20:35"
  }
];

export const RewardsDashboard = () => {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  
  // Total rewards calculation
  const totalEarned = 0.00463;
  const claimableRewards = 0.00130;
  
  const handleWithdraw = () => {
    // Here you would integrate with blockchain
    setShowWithdrawDialog(false);
  };
  
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Rewards Dashboard</h2>
          <p className="text-muted-foreground">Track and withdraw your mining rewards</p>
        </div>
        
        <Button
          onClick={() => setShowWithdrawDialog(true)}
          disabled={claimableRewards <= 0}
          className="gap-2"
        >
          <Download size={16} />
          Withdraw Rewards
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card border border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CircleDollarSign className="text-crypto-bitcoin" size={18} />
              Total Earned
            </CardTitle>
            <CardDescription>All-time mining rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-2xl font-bold text-crypto-bitcoin">
              {totalEarned.toFixed(8)} BTC
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CircleDollarSign className="text-primary" size={18} />
              Claimable Rewards
            </CardTitle>
            <CardDescription>Available to withdraw</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-2xl font-bold">
              {claimableRewards.toFixed(8)} BTC
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-crypto-success" size={18} />
              Earning Rate
            </CardTitle>
            <CardDescription>Current daily rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-2xl font-bold text-crypto-success">
              0.00012 BTC<span className="text-sm font-normal text-muted-foreground">/day</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent mining rewards and withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="font-medium">{tx.date}</div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`
                      inline-flex px-2 py-1 rounded-full text-xs
                      ${tx.type === "Withdrawal" ? "bg-primary/20 text-primary" : "bg-crypto-success/20 text-crypto-success"}
                    `}>
                      {tx.type}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">
                    {tx.type === "Withdrawal" ? "-" : "+"}{tx.amount.toFixed(8)} BTC
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {tx.status}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {tx.id}...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Withdraw Mining Rewards</DialogTitle>
            <DialogDescription>
              Withdraw your mining rewards to your connected wallet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-secondary p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Available Balance:</span>
                <span className="font-mono font-bold">{claimableRewards.toFixed(8)} BTC</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Withdrawal Fee (10%):</span>
                <span className="font-mono text-destructive">-{(claimableRewards * 0.1).toFixed(8)} BTC</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">You will receive:</span>
                  <span className="font-mono font-bold text-crypto-bitcoin">
                    {(claimableRewards * 0.9).toFixed(8)} BTC
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm mb-2 font-medium">Withdrawal Information:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 10% platform fee applies to all withdrawals</li>
                <li>• Minimum withdrawal: 0.0005 BTC</li>
                <li>• Funds will be sent to your connected wallet</li>
                <li>• Processing time: 1-24 hours</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
