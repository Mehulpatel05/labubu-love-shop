import heroBanner from "@/assets/hero-banner.jpg";
import { ShieldCheck, Truck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden gradient-hero">
      <div className="container flex flex-col md:flex-row items-center py-10 md:py-20 gap-8 px-4 sm:px-6">

        {/* Text */}
        <div className="flex-1 text-center md:text-left space-y-4 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Star className="h-3 w-3 fill-primary" /> Trending in India 🇮🇳
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
            Cute Protection<br />
            <span className="text-primary">for Your Tech ✨</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto md:mx-0">
            Adorable Labubu-themed cases for your phone & earphones. 🐰
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5 text-green-500" /> Free Delivery</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> 7-Day Returns</span>
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" /> 4.9 · 1,200+ Orders</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:shadow-cute-lg hover:scale-105 transition-all duration-200 text-sm min-h-[44px]">
              Shop Now 🛒
            </button>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm min-h-[44px]">
              View Collection
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroBanner}
            alt="Labubu Cases Collection"
            className="w-full max-w-sm md:max-w-lg shadow-cute-lg animate-float object-contain rounded-2xl"
            style={{ minHeight: "200px" }}
          />
        </div>
      </div>
    </section>
  );
}
