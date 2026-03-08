import { Link } from "react-router-dom";
import type { Product } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
      <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center p-4 sm:p-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
        <h3 className="font-display text-base sm:text-lg font-bold text-foreground leading-tight">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between pt-1 gap-2">
          <span className="text-lg sm:text-xl font-extrabold text-primary">₹{product.price}</span>
          <Link
            to={`/product/${product.id}`}
            className="px-3 sm:px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-transform whitespace-nowrap"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
