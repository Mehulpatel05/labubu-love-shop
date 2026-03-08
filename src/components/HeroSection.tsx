import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden gradient-hero h-[50vh] min-h-[280px]">
      <div className="container h-full flex flex-col-reverse md:flex-row items-center gap-3 sm:gap-4 py-4 sm:py-6 md:py-8">
        <div className="flex-1 text-center md:text-left space-y-2 sm:space-y-3 animate-fade-up">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground">
            Cute Protection for Your Tech –{" "}
            <span className="text-primary">Labubu Cases</span>
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-md mx-auto md:mx-0">
            Protect your AirPods and iPhone charger with adorable Labubu style.
          </p>
          <div className="flex flex-row gap-2 justify-center md:justify-start">
            <Link
              to="/#products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-cute hover:shadow-cute-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Shop Now
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200"
            >
              View Collection
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full max-h-full" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroBanner}
            alt="Labubu Cases Collection"
            className="w-full max-w-[140px] sm:max-w-[200px] md:max-w-xs rounded-2xl shadow-cute-lg animate-float object-contain"
          />
        </div>
      </div>
    </section>
  );
}
