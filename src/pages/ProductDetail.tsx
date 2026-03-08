import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Minus, Plus, ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProduct(id || "");
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-cream rounded-2xl p-8 flex items-center justify-center shadow-cute">
            <img src={product.image} alt={product.name} className="w-full max-w-sm object-contain animate-float" />
          </div>
          <div className="space-y-6">
            <h1 className="font-display text-3xl font-extrabold text-foreground">{product.name}</h1>
            <p className="text-2xl font-extrabold text-primary">₹{product.price}</p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">Quantity:</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 rounded-full border bg-card flex items-center justify-center hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold w-8 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-9 w-9 rounded-full border bg-card flex items-center justify-center hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => addToCart(product, qty)}
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={() => { addToCart(product, qty); navigate("/checkout"); }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:scale-105 transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
