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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative text-center py-20 md:py-32 px-4 flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDB8fHx8MTc2NzY0NjkzNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Delicious chocolate cake"
            fill
            className="object-cover"
            data-ai-hint="chocolate cake"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-md">
            Doorstep Desserts
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl drop-shadow-sm">
            Handcrafted desserts, delivered right to your door.
          </p>
        </div>
      </section>

      <section id="menu" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-primary">
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
                              Flavor
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {product.variants.map((variant) => (
                              <DropdownMenuItem key={variant.id}>
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
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
