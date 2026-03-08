import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden gradient-hero">
      <div className="container md:flex-row items-center py-12 md:py-20 gap-[25px] flex flex-row">
        <div className="flex-1 text-center md:text-left space-y-5 animate-fade-up">
          <h1 className="font-display sm:text-4xl md:text-5xl font-extrabold leading-tight text-foreground text-xl">
            Cute Protection for Your Tech –{" "}
            <span className="text-primary">Labubu Cases</span>
          </h1>
          

          
          <div className="flex-wrap md:justify-start flex items-center justify-center gap-[15px]">
            <Link
              to="/#products"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:shadow-cute-lg hover:scale-105 transition-all duration-200 text-xs">
              
              Shop Now
            </Link>
            <Link
              to="/#products"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs">
              
              View Collection
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroBanner}
            alt="Labubu Cases Collection"
            className="w-full max-w-md md:max-w-lg shadow-cute-lg animate-float object-contain rounded-2xl" />
        </div>
      </div>
    </section>);

}