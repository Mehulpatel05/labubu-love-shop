import { useCart } from "@/lib/cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";

const schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  address: z.string().trim().min(1, "Address is required").max(300),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  pinCode: z.string().trim().min(6, "Valid PIN code required").max(6),
});

type FormData = z.infer<typeof schema>;

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState<FormData>({ fullName: "", phone: "", address: "", city: "", state: "", pinCode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (items.length === 0) {
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

    setSubmitting(true);
    try {
      const { data: order, error: dbError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: form.fullName,
          customer_phone: form.phone,
          customer_address: form.address,
          customer_city: form.city,
          customer_state: form.state,
          customer_pincode: form.pinCode,
          items: items as any,
          total_price: totalPrice,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      navigate("/order-confirmation", {
        state: { customer: form, items, totalPrice, orderNumber: order.order_number },
      });
      clearCart();
    } catch (err: any) {
      console.error("Order error:", err);
      alert("Order place karne mein error aaya. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors[field] ? "border-destructive" : "border-border"}`;

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-3xl">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mb-6 sm:mb-8">Checkout</h1>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Order Summary */}
          <div className="space-y-4 md:order-2">
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
              <div className="pt-3 border-t flex justify-between font-display font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary text-lg">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4 md:order-1">
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
        </form>
      </div>
    </section>
  );
}
