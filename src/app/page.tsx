import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
