"use client";

import { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./actions";
import { CheckoutForm } from "@/components/checkout-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (cartTotal > 0) {
      createPaymentIntent(cartTotal)
        .then((secret) => {
          if (secret) {
            setClientSecret(secret);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [cartTotal]);

  const handleSuccessfulCheckout = () => {
    clearCart();
    router.push("/tracking?status=success");
  };

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
     return (
      <div className="container mx-auto max-w-2xl py-12 px-4 text-center">
         <p className="text-destructive">Stripe publishable key is not set. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.</p>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Checkout</h1>
        <p className="text-lg text-muted-foreground">
          Total: ${cartTotal.toFixed(2)}
        </p>
      </div>

      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} onSuccessfulCheckout={handleSuccessfulCheckout}/>
        </Elements>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Loading secure payment form...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
