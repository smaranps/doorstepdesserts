import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="bg-background">
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Doorstep Desserts
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Handcrafted desserts, delivered right to your door.
        </p>
      </section>

      <section id="menu" className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Our Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === product.imageId
              );
              return (
                <Card
                  key={product.id}
                  className="flex flex-col overflow-hidden"
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
                  <CardFooter className="p-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button asChild>
                      <Link href="/checkout">Buy Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
