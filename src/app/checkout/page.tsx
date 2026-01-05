import Link from 'next/link';
import Image from 'next/image';
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
    <div className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-12 items-start">
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
      <div className="hidden md:block rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605974322251-8f0da751f98f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZnVkZ2UlMjBicm93bmllc3xlbnwwfHx8fDE3Njc2NDY5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Gooey Fudge Brownies"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          data-ai-hint="fudge brownies"
        />
      </div>
    </div>
  );
}
