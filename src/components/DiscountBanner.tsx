import { Gift } from "lucide-react";

export default function DiscountBanner() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-primary text-white py-2.5 text-center text-sm font-semibold overflow-hidden">
      <div className="container flex items-center justify-center gap-2 px-4">
        <Gift className="h-4 w-4 shrink-0" />
        <span className="truncate text-xs sm:text-sm">🎉 Free Shipping on Orders Above ₹999 | Use Code: LABUBU10 for 10% Off!</span>
      </div>
    </div>
  );
}
