import { Link } from "react-router-dom";
import type { Product } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-display text-lg font-bold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-extrabold text-primary">₹{product.price}</span>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:scale-105 transition-transform"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
