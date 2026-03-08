import { Link } from "react-router-dom";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
      <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center p-4 sm:p-6">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
        <h3 className="font-display text-base sm:text-lg font-bold text-foreground leading-tight">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{product.short_description}</p>
        <div className="flex items-center justify-between pt-1 gap-1">
          <span className="text-base sm:text-lg font-extrabold text-primary">₹{product.price}</span>
          <Link
            to={`/product/${product.slug}`}
            className="px-2.5 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold hover:scale-105 active:scale-95 transition-transform whitespace-nowrap"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
