import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden gradient-hero">
      <div className="container md:flex-row items-center gap-8 py-12 md:py-20 flex flex-col">
        <div className="flex-1 text-center md:text-left space-y-5 animate-fade-up">
          <h1 className="font-display sm:text-4xl md:text-5xl font-extrabold leading-tight text-foreground text-2xl">
            Cute Protection for Your Tech –{" "}
            <span className="text-primary">Labubu Cases</span>
          </h1>
          

          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              to="/#products"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute hover:shadow-cute-lg hover:scale-105 transition-all duration-200">
              
              Shop Now
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200">
              
              View Collection
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroBanner}
            alt="Labubu Cases Collection"
            className="w-full max-w-lg shadow-cute-lg animate-float object-fill rounded-sm" />
          
        </div>
      </div>
    </section>);

}