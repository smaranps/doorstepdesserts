"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission,
        // e.g., send data to a server, process payment.
        // For this simple version, we'll just redirect to a success page.
        router.push("/tracking?status=success");
    }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Checkout</h1>
        <p className="text-lg text-muted-foreground">
          Complete your order below.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Contact & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="jane@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Dessert Lane" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Sugartown" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="CA" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input id="zip" placeholder="90210" required />
              </div>
            </div>

            <div className="!mt-8 space-y-4">
                <h3 className="font-semibold text-lg">Payment Method</h3>
                 <RadioGroup defaultValue="card" className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit / Debit Card</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" disabled/>
                        <Label htmlFor="paypal">PayPal (coming soon)</Label>
                    </div>
                </RadioGroup>
            </div>

             <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM / YY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required />
              </div>
            </div>


          </CardContent>
          <div className="p-6 pt-0">
             <Button type="submit" className="w-full" size="lg">
                Place Order
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
