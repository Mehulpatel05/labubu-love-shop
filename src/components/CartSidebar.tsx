import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Link } from "react-router-dom";

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-card z-50 shadow-2xl flex flex-col" style={{ animation: "slide-in-cart 0.3s ease-out" }}>
        <div className="flex items-center justify-between p-4 sm:p-5 border-b">
          <h2 className="font-display text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors active:scale-95" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 sm:gap-4 bg-muted/50 rounded-xl p-3">
                <img src={item.product.image_url} alt={item.product.name} className="w-16 sm:w-20 h-16 sm:h-20 object-contain bg-cream rounded-lg" />
                <div className="flex-1 space-y-1 min-w-0">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-foreground truncate">{item.product.name}</h3>
                  <p className="text-primary font-bold text-xs sm:text-sm">₹{item.product.price}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-7 w-7 rounded-full bg-card border flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs sm:text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-7 rounded-full bg-card border flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-xs text-destructive hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t space-y-3 sm:space-y-4 pb-safe">
            <div className="flex justify-between font-display font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 rounded-full bg-primary text-primary-foreground font-bold text-center hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-cute"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
