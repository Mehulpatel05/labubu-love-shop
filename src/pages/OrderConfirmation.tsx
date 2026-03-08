import { useLocation, Navigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state as { customer: any; items: any[]; totalPrice: number } | null;

  if (!state) return <Navigate to="/" replace />;

  return (
    <section className="py-16">
      <div className="container max-w-lg text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary animate-bounce-cute" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-foreground">Thank you for your order!</h1>
        <p className="text-muted-foreground">Your Labubu case will be delivered soon. 🧸</p>

        <div className="bg-muted/50 rounded-xl p-5 text-left space-y-4">
          <h2 className="font-display font-bold text-foreground text-sm">Order Summary</h2>
          {state.items.map((item: any) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain bg-cream rounded-lg" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-primary">₹{item.product.price * item.quantity}</p>
            </div>
          ))}
          <div className="pt-3 border-t flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">₹{state.totalPrice}</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-5 text-left space-y-2">
          <h2 className="font-display font-bold text-foreground text-sm">Delivery Details</h2>
          <p className="text-sm text-foreground">{state.customer.fullName}</p>
          <p className="text-sm text-muted-foreground">{state.customer.phone}</p>
          <p className="text-sm text-muted-foreground">
            {state.customer.address}, {state.customer.city}, {state.customer.state} - {state.customer.pinCode}
          </p>
          <p className="text-sm font-bold text-foreground">Payment: Cash on Delivery</p>
        </div>

        <Link
          to="/"
          className="inline-flex px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:scale-105 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
