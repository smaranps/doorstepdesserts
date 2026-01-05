"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  clientSecret: string;
  onSuccessfulCheckout: () => void;
}

export function CheckoutForm({ clientSecret, onSuccessfulCheckout }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/tracking`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "An unexpected error occurred.");
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: error.message ?? "Please try again.",
      });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast({
        title: "Payment Successful!",
        description: "Your order is being processed.",
      });
      onSuccessfulCheckout();
    }


    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Enter your payment details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement id="payment-element" />
          {errorMessage && <div className="text-destructive mt-4 text-sm">{errorMessage}</div>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !stripe || !elements} className="w-full" size="lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
