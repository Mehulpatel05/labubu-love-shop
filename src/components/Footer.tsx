import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t py-8 sm:py-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground">🧸 Labubu Store</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">Cute protection for your everyday tech.</p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="mailto:hello@labubustore.com" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground">Shipping</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">Free shipping on orders above ₹999. Delivery within 5-7 business days across India.</p>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground">Returns</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">7-day return policy for unused and undamaged products. Contact us for returns.</p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Labubu Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
