"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, cartTotal, cartCount, updateItemQuantity, removeItem } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="space-y-4">
                {items.map((item) => {
                  const image = PlaceHolderImages.find(
                    (img) => img.id === item.product.imageId
                  );
                  return (
                    <div key={item.product.id} className="flex items-start gap-4">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive ml-auto"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2">
                   <SheetClose asChild>
                    <Button asChild>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link href="/cart">View Cart</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some delicious desserts to get started.
            </p>
            <SheetClose asChild>
              <Button className="mt-6" asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
