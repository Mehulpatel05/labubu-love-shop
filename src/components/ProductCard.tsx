import { Link } from "react-router-dom";
import type { Product } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [added, setAdded] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:scale-110 active:scale-95 transition-all"
      >
        <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
      </button>
      <Link to={`/product/${product.slug}`}>
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
          <div className="flex items-center justify-between pt-1 gap-2">
            <span className="text-base sm:text-lg font-extrabold text-primary">₹{product.price}</span>
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-primary text-primary-foreground hover:scale-105"
              }`}
            >
              {added ? (
                <><Check className="h-3 w-3" /><span className="hidden xs:inline sm:inline">Added</span></>
              ) : (
                <><ShoppingCart className="h-3 w-3" /><span className="hidden sm:inline">Add to Cart</span></>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
