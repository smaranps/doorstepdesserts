"use server";

import { stripe } from "@/lib/stripe";

export async function createPaymentIntent(
  amount: number
): Promise<string | null> {
  // Ensure the amount is an integer in the smallest currency unit (e.g., cents)
  const amountInCents = Math.round(amount * 100);

  if (amountInCents <= 0) {
    return null;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return null;
  }
}
