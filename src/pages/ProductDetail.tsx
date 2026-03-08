import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Minus, Plus, ArrowLeft, Check } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProduct(id || "");
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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

  return (
    <section className="py-6 sm:py-10">
      <div className="container">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 sm:mb-6 transition-colors active:scale-95">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-cute">
            <img src={product.image} alt={product.name} className="w-full max-w-[250px] sm:max-w-sm object-contain animate-float" />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">{product.name}</h1>
            <p className="text-xl sm:text-2xl font-extrabold text-primary">₹{product.price}</p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">Quantity:</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 rounded-full border bg-card flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold w-8 text-center text-lg">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 rounded-full border bg-card flex items-center justify-center hover:bg-muted active:scale-90 transition-all">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`flex-1 px-8 py-3.5 rounded-full border-2 font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  added
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {added ? <><Check className="h-4 w-4" /> Added!</> : "Add to Cart"}
              </button>
              <button
                onClick={() => { addToCart(product, qty); navigate("/checkout"); }}
                className="flex-1 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:scale-105 active:scale-95 transition-all"
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
