import { useCart } from "@/lib/cart";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  address: z.string().trim().min(1, "Address is required").max(300),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  pinCode: z.string().trim().min(6, "Valid PIN code required").max(6),
});

type FormData = z.infer<typeof schema>;

const CHECKOUT_FORM_KEY = "checkout_form_data";
const VALID_COUPON = "LABUBU10";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const savedForm = (() => {
    try {
      const saved = sessionStorage.getItem(CHECKOUT_FORM_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();

  const [form, setForm] = useState<FormData>(savedForm || { fullName: "", phone: "", address: "", city: "", state: "", pinCode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === VALID_COUPON) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  // After login redirect, auto-submit if we have saved form data
  useEffect(() => {
    if (user && savedForm && location.state?.fromCheckout) {
      sessionStorage.removeItem(CHECKOUT_FORM_KEY);
      setPendingSubmit(true);
    }
  }, [user]);

  useEffect(() => {
    if (pendingSubmit && user) {
      setPendingSubmit(false);
      placeOrder();
    }
  }, [pendingSubmit, user]);

  if (items.length === 0 && !pendingSubmit) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <button onClick={() => navigate("/")} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
          Shop Now
        </button>
      </div>
    );
  }

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const placeOrder = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const orderRef = push(ref(db, "orders"));
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
      const orderData = {
        user_id: user.uid,
        order_number: orderNumber,
        customer_name: form.fullName,
        customer_phone: form.phone,
        customer_address: form.address,
        customer_city: form.city,
        customer_state: form.state,
        customer_pincode: form.pinCode,
        items: items.map(i => ({ product: { id: i.product.id, name: i.product.name, price: i.product.price, image: i.product.image_url }, quantity: i.quantity })),
        total_price: finalPrice,
        coupon_applied: couponApplied ? VALID_COUPON : null,
        discount_amount: discount,
        status: "confirmed",
        created_at: new Date().toISOString()
      };
      await set(orderRef, orderData);

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Order #${orderNumber} has been confirmed.`,
      });

      sessionStorage.removeItem(CHECKOUT_FORM_KEY);
      navigate("/order-confirmation", {
        state: { customer: form, items, totalPrice: finalPrice, orderNumber },
      });
      clearCart();
    } catch (err: any) {
      console.error("Order error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!user) {
      sessionStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(form));
      navigate("/login", { state: { fromCheckout: true } });
      return;
    }

    await placeOrder();
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors[field] ? "border-destructive" : "border-border"}`;

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-3xl">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mb-6 sm:mb-8">Checkout</h1>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Customer Details — first in DOM so mobile shows it first */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-foreground">Customer Details</h2>
            {(
              [
                ["fullName", "Full Name", "text"],
                ["phone", "Phone Number", "tel"],
                ["address", "Address", "text"],
                ["city", "City", "text"],
                ["state", "State", "text"],
                ["pinCode", "PIN Code", "text"],
              ] as [keyof FormData, string, string][]
            ).map(([key, label, type]) => (
              <div key={key}>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">{label}</label>
                <input
                  type={type}
                  inputMode={key === "phone" || key === "pinCode" ? "numeric" : undefined}
                  className={inputClass(key)}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={label}
                />
                {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
              </div>
            ))}
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Coupon Code</h3>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter coupon (e.g. LABUBU10)"
                  value={coupon}
                  onChange={(e) => { setCoupon(e.target.value); setCouponApplied(false); setCouponError(""); }}
                />
                <button type="button" onClick={applyCoupon} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
                  Apply
                </button>
              </div>
              {couponApplied && <p className="text-xs text-green-600 mt-1 font-semibold">✓ 10% discount applied!</p>}
              {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
            </div>
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Payment</h3>
              <div className="flex items-center gap-2 p-3 rounded-xl border bg-blush/50">
                <div className="h-4 w-4 rounded-full border-4 border-primary" />
                <span className="text-sm font-bold text-foreground">Cash on Delivery (COD)</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:scale-[1.02] active:scale-[0.98] transition-transform mt-2 disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>

          {/* Order Summary — second in DOM, shown on right on desktop */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-foreground">Order Summary</h2>
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image_url} alt={item.product.name} className="w-12 sm:w-14 h-12 sm:h-14 object-contain bg-cream rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">₹{item.product.price * item.quantity}</p>
                </div>
              ))}
              <div className="pt-3 border-t space-y-1.5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span><span>₹{totalPrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Discount (LABUBU10)</span><span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-display font-bold text-foreground pt-1 border-t">
                  <span>Total</span>
                  <span className="text-primary text-lg">₹{finalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
