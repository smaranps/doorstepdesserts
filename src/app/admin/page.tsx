import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-8">
        <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Admin Panel</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the control center for Doorstep Desserts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Management Area</CardTitle>
          <CardDescription>
            This area is restricted. Here you would typically manage products,
            view incoming orders, and manage customer information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Functionality for the admin panel, such as product management and
            order tracking, would be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
