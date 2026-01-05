
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
