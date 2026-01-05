
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Dessert, DessertVariant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ProductCardProps {
  product: Dessert;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<DessertVariant | null>(
    product.variants?.[0] || null
  );

  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card
      key={product.id}
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
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
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <p className="text-lg font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2">
          {product.variants && product.variants.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedVariant ? selectedVariant.name : 'Flavor'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {product.variants.map((variant) => (
                  <DropdownMenuItem
                    key={variant.id}
                    onSelect={() => setSelectedVariant(variant)}
                  >
                    {variant.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button asChild>
            <Link href="/checkout">Buy Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
