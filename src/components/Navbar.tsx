import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/90 backdrop-blur-lg">
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg sm:text-xl font-extrabold text-primary">
          🧸 Labubu Store
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}