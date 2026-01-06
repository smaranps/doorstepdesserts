
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot } from 'lucide-react';

const Logo = () => (
  <svg
    className="h-16 w-16 text-white drop-shadow-md"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="hsla(0, 0%, 100%, 0.2)"
    />
    <path
      d="M2 7L12 12L22 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 4.5L16 9L12 12L8 9L6.5 4.5"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


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
        <div className="relative z-10 flex flex-col items-center">
          <Logo />
          <h1 className="text-4xl md:text-6xl font-headline font-bold mt-4 mb-4 drop-shadow-md">
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
      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.332249829324!2d-122.0089705846959!3d37.3346654798426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127263c7f%3A0x21696515a201c10b!2sApple%20Park!5e0!3m2!1sen!2sus!4v1678886369535!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                About Us
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in a small kitchen with a big dream, Doorstep Desserts is a passion project dedicated to the art of baking. We believe that a great dessert can make any day special.
              </p>
              <p className="text-muted-foreground">
                We use only the finest ingredients, sourced locally whenever possible, to handcraft every brownie, cookie, and cake. Our mission is simple: to deliver a little piece of happiness, right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
            Design Your Dream Cake
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Have a special event? Use our AI-powered tool to create the perfect cake with custom flavors and decorations.
          </p>
          <Button asChild size="lg">
            <Link href="/cake-customizer">
              <Bot className="mr-2" />
              Start Customizing
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
