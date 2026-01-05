"use client";

import Link from "next/link";
import { CakeSlice, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "../cart-sheet";

export function Header() {
  const { cartCount } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CakeSlice className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Doorstep Desserts</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
