import { Link } from "react-router-dom";
import type { Product } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Heart, ShoppingCart, Check, Truck, Flame, Zap } from "lucide-react";
import { useState, useMemo } from "react";

export default function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [added, setAdded] = useState(false);

  // Deterministic urgency based on product id
  const stockLeft = useMemo(() => {
    const n = product.id.charCodeAt(product.id.length - 1) % 7;
    return n < 3 ? n + 2 : null; // show "X left" only for some products
  }, [product.id]);

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
    <div className="group bg-card rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] relative flex flex-col">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {featured && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-bold shadow">
            <Flame className="h-2.5 w-2.5" /> Best Seller
          </span>
        )}
        {stockLeft && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow">
            <Zap className="h-2.5 w-2.5" /> Only {stockLeft} left!
          </span>
        )}
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold shadow">
          <Truck className="h-2.5 w-2.5" /> Free Delivery
        </span>
      </div>

      {/* Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:scale-110 active:scale-95 transition-all min-h-[36px] min-w-[36px] flex items-center justify-center"
      >
        <Heart className={`h-4 w-4 transition-colors duration-200 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>

      <Link to={`/product/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center p-4 sm:p-6">
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 space-y-2 flex flex-col flex-1">
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground leading-tight tracking-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{product.short_description}</p>

          <div className="flex items-center justify-between pt-1 gap-2">
            <div>
              <span className="text-base sm:text-lg font-extrabold text-primary">₹{product.price}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 min-h-[36px] min-w-[80px] ${
                added
                  ? "bg-green-500 text-white scale-95"
                  : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-cute"
              }`}
            >
              {added ? (
                <><Check className="h-3 w-3" /><span>Added!</span></>
              ) : (
                <><ShoppingCart className="h-3 w-3" /><span>Add</span></>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
