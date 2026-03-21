import { ShoppingCart, Package, User, Shield, LogOut, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useWishlist } from "@/lib/wishlist";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked, user:", user?.email);
    try {
      await signOut();
      console.log("Sign out successful");
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/90 backdrop-blur-lg">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-lg sm:text-xl font-extrabold text-primary">
          🧸 Labubu Store
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-2">
          <Link to="/wishlist" className="relative p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95" aria-label="Wishlist">
            <Heart className="h-5 w-5 text-foreground" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          {user && (
            <Link to="/orders" className="p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95" aria-label="My Orders">
              <Package className="h-5 w-5 text-foreground" />
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95" aria-label="Admin">
              <Shield className="h-5 w-5 text-foreground" />
            </Link>
          )}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          {user ? (
            <button onClick={handleLogout} className="p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95" aria-label="Logout">
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
            </button>
          ) : (
            <Link to="/login" className="p-2 sm:p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95" aria-label="Login">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
