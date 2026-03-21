import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t py-6">
      <div className="container px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-sm">
          <div className="col-span-2 sm:col-span-1 space-y-2 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground">🧸 Labubu Store</h4>
            <p className="text-muted-foreground text-xs">Cute protection for your everyday tech.</p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <a href="mailto:swatmehul@gmail.com" className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/labubustore" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://wa.me/918306590731" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4 text-green-600" />
              </a>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground text-xs">Policies</h4>
            <div className="flex flex-col gap-1">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-xs transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary text-xs transition-colors">Terms & Conditions</Link>
              <Link to="/shipping-policy" className="text-muted-foreground hover:text-primary text-xs transition-colors">Shipping Policy</Link>
              <Link to="/refund-policy" className="text-muted-foreground hover:text-primary text-xs transition-colors">Refund Policy</Link>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground text-xs">Shipping</h4>
            <p className="text-muted-foreground text-xs">Free shipping above ₹999. Delivery in 5-7 days.</p>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-display font-bold text-foreground text-xs">Returns</h4>
            <p className="text-muted-foreground text-xs">7-day return policy. Contact us for help.</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Labubu Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
