import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { ref, get, set, remove, onValue, push } from "firebase/database";
import { Package, RefreshCw, ChevronDown, Plus, Pencil, Trash2, X, ShoppingBag } from "lucide-react";
import { fetchAllProductsAdmin, type Product } from "@/lib/products";

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

type Tab = "orders" | "products";

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");

  if (authLoading) return <div className="min-h-[60vh] flex items-center justify-center"><RefreshCw className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-destructive font-bold">Access Denied</p>
      <p className="text-muted-foreground text-sm">You don't have admin privileges.</p>
    </div>
  );

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-5xl">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground mb-4">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("orders")} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === "orders" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <Package className="h-4 w-4 inline mr-1.5" />Orders
          </button>
          <button onClick={() => setTab("products")} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${tab === "products" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <ShoppingBag className="h-4 w-4 inline mr-1.5" />Products
          </button>
        </div>

        {tab === "orders" ? <OrdersTab /> : <ProductsTab />}
      </div>
    </section>
  );
}

/* =================== ORDERS TAB =================== */
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchOrders = async () => {
    setLoading(true);
    const snapshot = await get(ref(db, "orders"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const allOrders = Object.entries(data)
        .map(([id, val]: [string, any]) => ({ id, ...val }))
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setOrders(allOrders as Order[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    const ordersRef = ref(db, "orders");
    const unsubscribe = onValue(ordersRef, () => fetchOrders());
    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    await set(ref(db, `orders/${orderId}/status`), newStatus);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdatingId(null);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
        <button onClick={fetchOrders} className="p-2 rounded-full hover:bg-muted transition-colors">
          <RefreshCw className={`h-4 w-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <button key={s} onClick={() => setFilter(filter === s ? "all" : s)} className={`p-2.5 rounded-xl border text-center transition-all ${filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs capitalize">{s.replace("_", " ")}</p>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12"><RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12"><Package className="h-12 w-12 text-muted-foreground/30 mx-auto" /><p className="text-muted-foreground mt-3">No orders found</p></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl border p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-foreground">{order.order_number}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="relative">
                  <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)} disabled={updatingId === order.id} className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-border bg-card text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer disabled:opacity-50">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Customer: </span><span className="font-bold text-foreground">{order.customer_name}</span></div>
                <div><span className="text-muted-foreground">Phone: </span><span className="font-bold text-foreground">{order.customer_phone}</span></div>
                <div className="sm:col-span-2"><span className="text-muted-foreground">Address: </span><span className="text-foreground">{order.customer_address}, {order.customer_city}, {order.customer_state} - {order.customer_pincode}</span></div>
              </div>
              <div className="space-y-2">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.product.image_url || item.product.image} alt={item.product.name} className="w-10 h-10 object-contain bg-cream rounded-lg" />
                    <div className="flex-1 min-w-0"><p className="text-xs font-bold text-foreground truncate">{item.product.name}</p><p className="text-xs text-muted-foreground">Qty: {item.quantity}</p></div>
                    <p className="text-xs font-bold text-primary">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
                <div className="pt-2 border-t flex justify-between font-bold text-foreground text-sm"><span>Total</span><span className="text-primary">₹{order.total_price}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* =================== PRODUCTS TAB =================== */
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetchAllProductsAdmin();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setIsNew(true);
    setEditing({ id: "", slug: "", name: "", price: 0, short_description: "", description: "", image_url: "", is_active: true });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await remove(ref(db, `products/${id}`));
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  const toggleActive = async (product: Product) => {
    await set(ref(db, `products/${product.id}/is_active`), !product.is_active);
    setProducts((p) => p.map((x) => x.id === product.id ? { ...x, is_active: !x.is_active } : x));
  };

  if (editing) {
    return <ProductForm product={editing} isNew={isNew} onDone={() => { setEditing(null); setIsNew(false); load(); }} onCancel={() => { setEditing(null); setIsNew(false); }} />;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{products.length} products</p>
        <button onClick={startNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12"><RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" /></div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className={`bg-card rounded-2xl border p-4 flex items-center gap-4 ${!product.is_active ? "opacity-50" : ""}`}>
              <img src={product.image_url} alt={product.name} className="w-14 h-14 object-contain bg-cream rounded-xl" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.slug}</p>
                <p className="text-sm font-bold text-primary">₹{product.price}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggleActive(product)} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${product.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {product.is_active ? "Active" : "Hidden"}
                </button>
                <button onClick={() => { setEditing(product); setIsNew(false); }} className="p-2 rounded-lg hover:bg-muted transition-colors"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4 text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* =================== PRODUCT FORM =================== */
function ProductForm({ product, isNew, onDone, onCancel }: { product: Product; isNew: boolean; onDone: () => void; onCancel: () => void }) {
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof Product, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "name" && isNew) {
      setForm((f) => ({ ...f, [field]: value, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
    }
  };

  const save = async () => {
    if (!form.name || !form.slug || !form.price) {
      setError("Name, slug, and price are required");
      return;
    }
    setSaving(true);
    setError("");

    const productData = {
      slug: form.slug,
      name: form.name,
      price: form.price,
      short_description: form.short_description,
      description: form.description,
      image_url: form.image_url,
      is_active: form.is_active,
    };

    try {
      if (isNew) {
        const newRef = push(ref(db, "products"));
        await set(newRef, productData);
      } else {
        await set(ref(db, `products/${product.id}`), { ...productData, id: product.id });
      }
      onDone();
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-foreground">{isNew ? "Add Product" : "Edit Product"}</h2>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-muted"><X className="h-5 w-5 text-muted-foreground" /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Name</label>
          <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Product Name" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Slug</label>
          <input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="product-slug" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Price (₹)</label>
          <input type="number" className={inputClass} value={form.price} onChange={(e) => update("price", Number(e.target.value))} placeholder="499" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Status</label>
          <select className={inputClass} value={form.is_active ? "active" : "hidden"} onChange={(e) => update("is_active", e.target.value === "active")}>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Short Description</label>
          <input className={inputClass} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} placeholder="Brief description" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Description</label>
          <textarea className={`${inputClass} min-h-[100px]`} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Detailed description" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Image URL</label>
          <input className={inputClass} value={form.image_url} onChange={(e) => update("image_url", e.target.value)} placeholder="/products/image.png" />
          {form.image_url && /^https?:\/\//.test(form.image_url) && <img src={form.image_url} alt="Preview" className="w-20 h-20 object-contain bg-cream rounded-xl mt-2" />}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <button onClick={save} disabled={saving} className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50">
          {saving ? "Saving..." : isNew ? "Add Product" : "Save Changes"}
        </button>
        <button onClick={onCancel} className="px-6 py-3 rounded-full border border-border font-bold text-sm text-muted-foreground hover:bg-muted transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}
