import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Package, RefreshCw, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = ["confirmed", "processing", "shipped", "out_for_delivery", "delivered"] as const;
type OrderStatus = typeof STATUS_OPTIONS[number];

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  items: any[];
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  // Realtime updates
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        fetchOrders();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  if (authLoading) return <div className="min-h-[60vh] flex items-center justify-center"><RefreshCw className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-destructive font-bold">Access Denied</p>
      <p className="text-muted-foreground text-sm">You don't have admin privileges.</p>
    </div>
  );

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdatingId(null);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">Admin Dashboard</h1>
          <button onClick={fetchOrders} className="p-2 rounded-full hover:bg-muted transition-colors" title="Refresh">
            <RefreshCw className={`h-5 w-5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {STATUS_OPTIONS.map((s) => {
            const count = orders.filter((o) => o.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setFilter(filter === s ? "all" : s)}
                className={`p-3 rounded-xl border text-center transition-all ${filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
              >
                <p className="text-lg font-bold">{count}</p>
                <p className="text-xs capitalize">{s.replace("_", " ")}</p>
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12"><RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl border p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-foreground">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        disabled={updatingId === order.id}
                        className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-card text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer: </span>
                    <span className="font-bold text-foreground">{order.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-bold text-foreground">{order.customer_phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Address: </span>
                    <span className="text-foreground">{order.customer_address}, {order.customer_city}, {order.customer_state} - {order.customer_pincode}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain bg-cream rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-primary">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="pt-2 border-t flex justify-between font-bold text-foreground text-sm">
                    <span>Total</span>
                    <span className="text-primary">₹{order.total_price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
