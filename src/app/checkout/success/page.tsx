
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto max-w-lg py-12 px-4">
      <Card className="w-full text-center">
        <CardHeader>
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline">
            Order Confirmed!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You will receive an email confirmation shortly.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
