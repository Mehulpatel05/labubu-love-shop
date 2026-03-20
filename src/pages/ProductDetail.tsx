import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProduct, fetchProducts, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { Minus, Plus, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setAdded(false);
    Promise.all([
      fetchProduct(id || ""),
      fetchProducts(),
    ]).then(([p, all]) => {
      setProduct(p);
      setSuggested(all.filter((x) => x.slug !== id).slice(0, 4));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen pb-20">
        <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-lg border-b px-3 py-2.5 flex items-center gap-3">
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-40 animate-pulse" />
        </div>
        <div className="bg-white p-6 flex items-center justify-center">
          <div className="w-[200px] h-[200px] bg-muted rounded-2xl animate-pulse" />
        </div>
        <div className="px-4 py-3 bg-card space-y-3 mt-1.5">
          <div className="h-7 bg-muted rounded w-24 animate-pulse" />
          <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
        </div>
        <div className="px-4 py-3 bg-card mt-1.5 flex gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-12 w-16 bg-muted rounded-xl animate-pulse" />)}
        </div>
        <div className="px-4 py-3 bg-card mt-1.5 space-y-2">
          <div className="h-4 bg-muted rounded w-28 animate-pulse" />
          <div className="h-3 bg-muted rounded w-full animate-pulse" />
          <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-muted rounded w-4/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const originalPrice = Math.round(product.price * 1.4);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-lg border-b px-3 py-2.5 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted active:scale-90 transition-all">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="text-sm font-semibold text-foreground truncate flex-1">{product.name}</span>
      </div>

      <div className="bg-white p-6 flex items-center justify-center">
        <img src={product.image_url} alt={product.name} className="w-full max-w-[200px] sm:max-w-[260px] object-contain animate-float" />
      </div>

      <div className="px-4 py-3 bg-card space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-primary">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
          <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">{discount}% off</span>
        </div>
        <h1 className="text-base font-bold text-foreground leading-snug">{product.name}</h1>
      </div>

      <div className="px-4 py-3 bg-card mt-1.5 flex items-center gap-4 overflow-x-auto">
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <Truck className="h-5 w-5 text-primary" />
          <span className="text-[10px] text-muted-foreground text-center">Free Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <RotateCcw className="h-5 w-5 text-primary" />
          <span className="text-[10px] text-muted-foreground text-center">7 Day Return</span>
        </div>
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[10px] text-muted-foreground text-center">Genuine Product</span>
        </div>
      </div>

      <div className="px-4 py-3 bg-card mt-1.5">
        <h2 className="text-sm font-bold text-foreground mb-1.5">Product Details</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <div className="px-4 py-3 bg-card mt-1.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Quantity</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8 rounded-full border bg-card flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="font-bold w-6 text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="h-8 w-8 rounded-full border bg-card flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 bg-card mt-1.5">
        <h2 className="text-sm font-bold text-foreground mb-3">You May Also Like</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {suggested.map((p) => (
            <Link key={p.id} to={`/product/${p.slug}`} className="min-w-[130px] max-w-[130px] bg-background rounded-xl border p-2.5 flex flex-col items-center gap-2 hover:shadow-cute transition-shadow">
              <img src={p.image_url} alt={p.name} className="w-16 h-16 object-contain" />
              <p className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2">{p.name}</p>
              <p className="text-xs font-bold text-primary">₹{p.price}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-lg border-t px-4 py-2.5 pb-safe flex gap-3">
        <button
          onClick={handleAdd}
          className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
            added ? "border-green-500 text-green-600 bg-green-50" : "border-primary text-primary hover:bg-primary/10"
          }`}
        >
          {added ? <><Check className="h-4 w-4" /> Added!</> : "Add to Cart"}
        </button>
        <button
          onClick={() => { addToCart(product, qty); navigate("/checkout"); }}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-cute hover:scale-[1.02] active:scale-95 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
