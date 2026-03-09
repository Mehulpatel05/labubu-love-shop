import { useWishlist } from "@/lib/wishlist";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="container py-12">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-primary fill-primary" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground mt-2">Add products you love to your wishlist!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
