import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            Sweetness, Delivered.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-8 text-primary-foreground/90">
            Indulge in our handcrafted desserts, made with love and the finest
            ingredients. Perfect for any occasion, delivered right to your door.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="#menu">
              Explore Our Desserts <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="menu" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Our Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
