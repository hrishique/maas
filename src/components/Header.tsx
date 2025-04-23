import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import { Logo } from "./Logo";

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showSignupFee, setShowSignupFee] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const handleConnect = () => {
    setIsConnected(true);
    // For new users, show signup fee modal
    if (!localStorage.getItem("maas-user")) {
      setShowSignupFee(true);
    }
  };

  const handleSignupComplete = () => {
    localStorage.setItem("maas-user", "true");
    setShowSignupFee(false);
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center">
        <Logo size={32} className="mr-2" />
        <h1 className="text-xl font-bold text-gradient">MaaS</h1>
        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-accent/20 text-accent-foreground">
          Beta
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {isConnected ? (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-crypto-success mr-2 animate-pulse"></div>
            <span className="text-sm font-mono">
              0x71...3d4f
            </span>
          </div>
        ) : (
          <Button onClick={handleConnect} className="flex items-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Signup Fee Modal */}
      <Dialog open={showSignupFee} onOpenChange={setShowSignupFee}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="text-xl">Welcome to MaaS</DialogTitle>
            <DialogDescription>
              To get started with Mining-as-a-Service, a one-time signup fee of 0.01 BTC is required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Referral Code (Optional)</Label>
              <Input 
                id="referral" 
                placeholder="Enter referral code" 
                value={referralCode} 
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Using a referral code can reduce your signup fee by up to 50%
              </p>
            </div>

            <div className="rounded-md bg-secondary p-3 flex justify-between items-center">
              <span className="text-sm">Signup Fee:</span>
              <span className="font-mono font-bold">0.01 BTC</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignupFee(false)}>
              Cancel
            </Button>
            <Button onClick={handleSignupComplete}>
              Pay & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};
