import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-lg py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Checkout</CardTitle>
          <CardDescription>
            Enter your information to place your order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jane.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card">Card Information</Label>
            <Input id="card" placeholder="Card Number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
          <Button asChild className="w-full" type="submit">
            <Link href="/checkout/success">Place Order</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
