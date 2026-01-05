"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Store, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items, cartTotal, cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartCount === 0) {
      router.push("/");
    }
  }, [cartCount, router]);

  if (cartCount === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="delivery" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Label htmlFor="delivery" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    <Truck className="mb-3 h-6 w-6" />
                    Delivery
                    <RadioGroupItem value="delivery" id="delivery" className="sr-only"/>
                  </Label>
                  <Label htmlFor="pickup" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    <Store className="mb-3 h-6 w-6" />
                    Pick Up
                    <RadioGroupItem value="pickup" id="pickup" className="sr-only"/>
                  </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2"><Label htmlFor="first-name">First name</Label><Input id="first-name" /></div>
                <div className="grid gap-2"><Label htmlFor="last-name">Last name</Label><Input id="last-name" /></div>
              </div>
              <div className="grid gap-2"><Label htmlFor="address">Address</Label><Input id="address" /></div>
              <div className="grid gap-2"><Label htmlFor="city">City</Label><Input id="city" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2"><Label htmlFor="state">State</Label><Input id="state" /></div>
                <div className="grid gap-2"><Label htmlFor="zip">ZIP Code</Label><Input id="zip" /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>Stripe integration coming soon.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** ****" disabled />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="expiry">Expiration</Label>
                  <Input id="expiry" placeholder="MM / YY" disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <span className="font-semibold">{item.product.name} x{item.quantity}</span>
                  <span className="text-muted-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(cartTotal + 5.00 + (cartTotal * 0.08)).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" disabled>
                <CreditCard className="mr-2 h-4 w-4" />
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
