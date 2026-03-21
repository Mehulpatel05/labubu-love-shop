import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Flame } from "lucide-react";

export default function FeaturedSection() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((p) => setFeatured(p.slice(0, 4)));
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 bg-background">
      <div className="container px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Best Sellers
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-sm mb-8">Our most loved products</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
