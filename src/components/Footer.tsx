
import { CircleDollarSign } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-border/40 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <CircleDollarSign size={20} className="text-primary mr-2" />
            <span className="font-bold text-gradient">MaaS Platform</span>
            <span className="text-xs ml-2 text-muted-foreground">Mining-as-a-Service</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MaaS. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
