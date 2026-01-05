"use client";

import { useCart } from "@/hooks/use-cart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/app/checkout/actions";
import { CheckoutForm } from "@/components/checkout-form";

// Make sure to add your publishable key as an environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (cartCount === 0) {
      router.push("/");
    }
  }, [cartCount, router]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (cartTotal > 0) {
      createPaymentIntent(cartTotal)
        .then((secret) => {
          if (secret) {
            setClientSecret(secret);
          }
        })
        .catch(console.error);
    }
  }, [cartTotal]);

  const handleSuccessfulCheckout = () => {
    clearCart();
    router.push("/tracking?status=success");
  }

  if (cartCount === 0 || !clientSecret) {
    // You can add a loading spinner here
    return null;
  }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} onSuccessfulCheckout={handleSuccessfulCheckout}/>
          </Elements>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-semibold">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
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
                <span>
                  ${(cartTotal + 5.0 + cartTotal * 0.08).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
