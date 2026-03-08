import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/90 backdrop-blur-lg">
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg sm:text-xl font-extrabold text-primary">
          🧸 Labubu Store
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="hidden sm:block text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/#products" className="hidden sm:block text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Products
          </Link>
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t bg-card/95 backdrop-blur-lg animate-fade-up">
          <div className="container py-3 flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="py-2.5 px-4 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              Home
            </Link>
            <Link to="/#products" onClick={() => setMenuOpen(false)} className="py-2.5 px-4 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              Products
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
