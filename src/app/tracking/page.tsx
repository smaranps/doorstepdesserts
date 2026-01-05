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
import { PackageSearch } from "lucide-react";

export default function TrackingPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 flex justify-center items-center min-h-[60vh]">
      <Card className="w-full">
        <CardHeader className="text-center">
          <PackageSearch className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-headline">Track Your Order</CardTitle>
          <CardDescription>
            Enter your order number to see its current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="order-number" className="sr-only">Order Number</Label>
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
