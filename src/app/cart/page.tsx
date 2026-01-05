"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, cartTotal, cartCount, updateItemQuantity, removeItem } =
    useCart();

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-4xl font-headline font-bold mb-8">Your Cart</h1>
      {cartCount > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === item.product.imageId
              );
              return (
                <Card key={item.product.id} className="overflow-hidden">
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
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
                    <div className="p-4 flex-grow">
                      <h3 className="font-semibold font-headline text-lg">
                        {item.product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateItemQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full mt-6" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any delicious desserts yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Browse Desserts</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
