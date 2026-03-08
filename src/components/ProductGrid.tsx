import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((p) => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="py-10 sm:py-16 bg-background">
      <div className="container">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-foreground mb-2">
          Our Products
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8 sm:mb-10">
          Browse our adorable Labubu collection
        </p>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
