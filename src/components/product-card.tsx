"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Dessert } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Dessert;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-[3/2] w-full relative">
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">
          {product.name}
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={() => addItem(product)} variant="secondary">
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
