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
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center">
            Best Sellers
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">Our most loved products</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
