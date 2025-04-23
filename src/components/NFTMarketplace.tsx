
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, ShoppingCart, Tag } from "lucide-react";

// Sample marketplace NFT listings
const MARKETPLACE_NFTS = [
  {
    id: 101,
    machineId: 1,
    machineName: "BTC Miner S19 Pro",
    nftId: 3,
    seller: "0x71...3d4f",
    price: 0.030, // Higher price than mint price (0.025)
    hashrate: "110 TH/s",
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=S19+Pro",
  },
  {
    id: 102,
    machineId: 2,
    machineName: "BTC Miner M30S++",
    nftId: 5,
    seller: "0x89...7a2c",
    price: 0.033, // Higher price than mint price (0.028)
    hashrate: "112 TH/s",
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M30S++",
  },
  {
    id: 103,
    machineId: 1,
    machineName: "BTC Miner S19 Pro",
    nftId: 4,
    seller: "0x32...9e8f",
    price: 0.028,
    hashrate: "110 TH/s",
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=S19+Pro",
  }
];

// Sample user owned NFTs
const USER_OWNED_NFTS = [
  {
    id: 201,
    machineId: 1,
    machineName: "BTC Miner S19 Pro",
    nftId: 2,
    hashrate: "110 TH/s",
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=S19+Pro",
    listed: false,
  },
  {
    id: 202,
    machineId: 2,
    machineName: "BTC Miner M30S++",
    nftId: 9,
    hashrate: "112 TH/s", 
    image: "https://via.placeholder.com/300x200/1A1F2C/FFFFFF?text=M30S++",
    listed: true,
    price: 0.035
  }
];

export const NFTMarketplace = () => {
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [listingPrice, setListingPrice] = useState<string>("");
  
  const handleListNFT = (nft: any) => {
    setSelectedNFT(nft);
    setListingPrice(nft.listed ? nft.price.toString() : "");
    setIsListingDialogOpen(true);
  };
  
  const handleBuyNFT = (nft: any) => {
    setSelectedNFT(nft);
    setIsBuyDialogOpen(true);
  };
  
  const handleListingComplete = () => {
    // Here you would typically interact with the blockchain
    setIsListingDialogOpen(false);
    setSelectedNFT(null);
  };
  
  const handlePurchaseComplete = () => {
    // Here you would typically interact with the blockchain
    setIsBuyDialogOpen(false);
    setSelectedNFT(null);
  };

  return (
    <section className="py-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">NFT Marketplace</h2>
        <p className="text-muted-foreground">Buy and sell mining machine NFTs</p>
      </div>
      
      {/* Your NFTs Section */}
      <div className="mb-12">
        <h3 className="text-xl font-medium mb-4">Your NFTs</h3>
        {USER_OWNED_NFTS.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border/50 rounded-lg">
            <p className="text-muted-foreground">You don't own any NFTs yet</p>
            <Button variant="outline" className="mt-4">Go to Mint NFTs</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {USER_OWNED_NFTS.map((nft) => (
              <Card key={nft.id} className="glass-card overflow-hidden border border-border/50">
                <div className="h-48 overflow-hidden">
                  <img src={nft.image} alt={nft.machineName} className="w-full h-full object-cover" />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{nft.machineName}</CardTitle>
                    <div className="px-2 py-1 rounded text-xs font-medium bg-primary/20">
                      NFT #{nft.nftId}
                    </div>
                  </div>
                  <CardDescription>Hashrate: {nft.hashrate}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    {nft.listed && (
                      <div className="bg-secondary/50 p-2 rounded-md flex justify-between items-center">
                        <span className="text-sm">Listed Price:</span>
                        <span className="font-mono font-medium">{nft.price} BTC</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    variant={nft.listed ? "outline" : "default"}
                    onClick={() => handleListNFT(nft)}
                  >
                    <Tag className="mr-2" size={16} />
                    {nft.listed ? "Update Listing" : "List for Sale"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Marketplace Section */}
      <div>
        <h3 className="text-xl font-medium mb-4">Available on Marketplace</h3>
        {MARKETPLACE_NFTS.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border/50 rounded-lg">
            <p className="text-muted-foreground">No NFTs are currently listed for sale</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MARKETPLACE_NFTS.map((nft) => (
              <Card key={nft.id} className="glass-card overflow-hidden border border-border/50">
                <div className="h-48 overflow-hidden">
                  <img src={nft.image} alt={nft.machineName} className="w-full h-full object-cover" />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{nft.machineName}</CardTitle>
                    <div className="px-2 py-1 rounded text-xs font-medium bg-primary/20">
                      NFT #{nft.nftId}
                    </div>
                  </div>
                  <CardDescription>Hashrate: {nft.hashrate}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Seller:</span>
                      <span className="font-mono">{nft.seller}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center">
                        <CircleDollarSign size={16} className="text-crypto-bitcoin mr-1" />
                        <span className="font-mono font-bold">{nft.price.toFixed(5)} BTC</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => handleBuyNFT(nft)}
                  >
                    <ShoppingCart className="mr-2" size={16} />
                    Buy NFT
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Listing Dialog */}
      <Dialog open={isListingDialogOpen} onOpenChange={setIsListingDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>List NFT for Sale</DialogTitle>
            <DialogDescription>
              Set your price for NFT #{selectedNFT?.nftId} of {selectedNFT?.machineName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-secondary p-4 rounded-md">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-primary/20 rounded-md flex items-center justify-center">
                  <span className="text-xl font-bold">#{selectedNFT?.nftId}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Machine:</span>
                  <span className="font-medium">{selectedNFT?.machineName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hashrate:</span>
                  <span className="font-medium">{selectedNFT?.hashrate}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Listing Price (BTC)</Label>
              <Input 
                id="price" 
                type="number" 
                step="0.001"
                min="0.001"
                value={listingPrice}
                onChange={(e) => setListingPrice(e.target.value)}
                placeholder="Enter price in BTC"
              />
              <p className="text-xs text-muted-foreground">
                Platform fee: 2.5% of the sale price
              </p>
            </div>
            
            <div className="rounded-md bg-secondary p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Your Receive:</span>
                <span className="font-mono">
                  {listingPrice ? (parseFloat(listingPrice) * 0.975).toFixed(5) : "0.00000"} BTC
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Platform Fee:</span>
                <span className="font-mono">
                  {listingPrice ? (parseFloat(listingPrice) * 0.025).toFixed(5) : "0.00000"} BTC
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsListingDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleListingComplete}
              disabled={!listingPrice || parseFloat(listingPrice) <= 0}
            >
              {selectedNFT?.listed ? "Update Listing" : "List for Sale"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Buy Dialog */}
      <Dialog open={isBuyDialogOpen} onOpenChange={setIsBuyDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Buy NFT</DialogTitle>
            <DialogDescription>
              Confirm purchase of NFT #{selectedNFT?.nftId} of {selectedNFT?.machineName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-secondary p-4 rounded-md">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-primary/20 rounded-md flex items-center justify-center">
                  <span className="text-xl font-bold">#{selectedNFT?.nftId}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Machine:</span>
                  <span className="font-medium">{selectedNFT?.machineName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hashrate:</span>
                  <span className="font-medium">{selectedNFT?.hashrate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seller:</span>
                  <span className="font-mono">{selectedNFT?.seller}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-secondary p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Price:</span>
                <span className="font-mono">{selectedNFT?.price?.toFixed(5)} BTC</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="font-mono font-bold">
                    {selectedNFT?.price?.toFixed(5)} BTC
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
            <Button variant="outline" onClick={() => setIsBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchaseComplete}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
