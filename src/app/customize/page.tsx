import { CakeCustomizer } from "@/components/cake-customizer";
import { Lightbulb } from "lucide-react";

export default function CustomizePage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold mb-2">
          Design Your Dream Cake
        </h1>
        <p className="text-lg text-muted-foreground">
          Not sure what to get? Let our AI assistant help you design the perfect
          cake for your occasion!
        </p>
      </div>

      <CakeCustomizer />
    </div>
  );
}
