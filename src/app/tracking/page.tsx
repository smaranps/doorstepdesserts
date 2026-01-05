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
import { PackageSearch, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface TrackingPageProps {
  searchParams: {
    status?: string;
  };
}

export default function TrackingPage({ searchParams }: TrackingPageProps) {
  const status = searchParams.status;

  if (status === "success") {
    return (
      <div className="container mx-auto max-w-2xl py-12 px-4 flex justify-center items-center min-h-[60vh]">
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
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 flex justify-center items-center min-h-[60vh]">
      <Card className="w-full">
        <CardHeader className="text-center">
          <PackageSearch className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-headline">
            Track Your Order
          </CardTitle>
          <CardDescription>
            Enter your order number to see its current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="order-number" className="sr-only">
              Order Number
            </Label>
            <Input id="order-number" placeholder="Enter your order number" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Track Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
