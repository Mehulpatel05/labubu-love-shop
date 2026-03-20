import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./products";
import { useAuth } from "./auth";
import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Load from Firebase when user logs in
  useEffect(() => {
    if (!user) return;
    get(ref(db, `wishlists/${user.uid}`)).then((snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const items = Object.values(data) as Product[];
        setWishlist(items);
      }
    });
  }, [user?.uid]);

  // Persist to Firebase (if logged in) or localStorage
  useEffect(() => {
    if (user) {
      const obj: Record<string, Product> = {};
      wishlist.forEach((p) => { obj[p.id] = p; });
      set(ref(db, `wishlists/${user.uid}`), wishlist.length > 0 ? obj : null);
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, user?.uid]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
