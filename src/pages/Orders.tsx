import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Search, Truck, CheckCircle, Clock, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STEPS = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Box },
  { key: "shipped", label: "Shipped", icon: Package },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  items: any[];
  total_price: number;
  status: string;
  created_at: string;
}

export default function Orders() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const searchOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 10) return;
    setLoading(true);
    setSearched(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_phone", phone.trim())
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const statusIndex = (status: string) => STATUS_STEPS.findIndex((s) => s.key === status);

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-2xl">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mb-2">My Orders</h1>
        <p className="text-sm text-muted-foreground mb-6">Apna phone number daalo aur orders track karo</p>

        <form onSubmit={searchOrders} className="flex gap-2 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </form>

        {selectedOrder ? (
          <div className="space-y-6">
            <button onClick={() => setSelectedOrder(null)} className="text-sm text-primary font-bold">
              ← Back to Orders
            </button>

            <div className="bg-card rounded-2xl border p-5 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-display font-bold text-foreground">{selectedOrder.order_number}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedOrder.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold capitalize">
                  {selectedOrder.status.replace("_", " ")}
                </span>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-0">
                <h3 className="font-display font-bold text-sm text-foreground mb-4">Live Tracking</h3>
                <div className="relative">
                  {STATUS_STEPS.map((step, i) => {
                    const active = i <= statusIndex(selectedOrder.status);
                    const current = i === statusIndex(selectedOrder.status);
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex items-start gap-3 relative">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} ${current ? "ring-4 ring-primary/20" : ""}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`w-0.5 h-8 ${active ? "bg-primary" : "bg-muted"}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`text-sm font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                          {current && <p className="text-xs text-primary">Current Status</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-foreground">Items</h3>
                {selectedOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain bg-cream rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-primary">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
                <div className="pt-3 border-t flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary text-lg">₹{selectedOrder.total_price}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {searched && orders.length === 0 && !loading && (
              <div className="text-center py-12 space-y-3">
                <Package className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground">No orders found for this number</p>
              </div>
            )}

            <div className="space-y-3">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full text-left bg-card rounded-2xl border p-4 hover:shadow-md transition-shadow active:scale-[0.99]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">{order.order_number}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold capitalize">
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{order.items.length} item(s)</p>
                    <p className="font-bold text-primary text-sm">₹{order.total_price}</p>
                  </div>
                  {/* Mini progress bar */}
                  <div className="flex gap-1 mt-3">
                    {STATUS_STEPS.map((step, i) => (
                      <div
                        key={step.key}
                        className={`h-1 flex-1 rounded-full ${i <= statusIndex(order.status) ? "bg-primary" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="text-center py-12 space-y-3">
            <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Enter your phone number to see your orders</p>
          </div>
        )}
      </div>
    </section>
  );
}
