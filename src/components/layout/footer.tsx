import Link from "next/link";
import { CakeSlice } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CakeSlice className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">Doorstep Desserts</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Doorstep Desserts. All rights reserved.
          </p>
          <div className="text-sm">
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
