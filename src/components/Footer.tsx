import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t py-8 sm:py-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 text-sm">
          <div className="space-y-3 text-center sm:text-left border-b sm:border-b-0 pb-5 sm:pb-0">
            <h4 className="font-display font-bold text-foreground">🧸 Labubu Store</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">Cute protection for your everyday tech.</p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="mailto:hello@labubustore.com" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                {/* TODO: Replace with your real email */}
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/labubustore" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                {/* TODO: Replace with your real Instagram URL */}
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp">
                {/* TODO: Replace with your real WhatsApp number */}
                <MessageCircle className="h-5 w-5 text-green-600" />
              </a>
            </div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left border-b sm:border-b-0 pb-5 sm:pb-0">
            <h4 className="font-display font-bold text-foreground">Policies</h4>
            <div className="flex flex-col gap-1">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors">Terms & Conditions</Link>
              <Link to="/shipping-policy" className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors">Shipping Policy</Link>
              <Link to="/refund-policy" className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors">Refund Policy</Link>
            </div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left border-b sm:border-b-0 pb-5 sm:pb-0">
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
