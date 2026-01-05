import Stripe from 'stripe';

// Make sure to add your secret key as an environment variable
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
    typescript: true,
});
