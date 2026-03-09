import { Star } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", rating: 5, text: "Absolutely love my Labubu phone case! Super cute and great quality.", location: "Mumbai" },
  { name: "Rahul Patel", rating: 5, text: "Fast delivery and adorable products. My daughter loves her Labubu toy!", location: "Delhi" },
  { name: "Sneha Reddy", rating: 4, text: "Good quality products. The mug is perfect for my morning coffee.", location: "Bangalore" },
  { name: "Arjun Kumar", rating: 5, text: "Best gift shop! Bought multiple items and all are amazing.", location: "Pune" },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-2">
          ⭐ Customer Reviews
        </h2>
        <p className="text-center text-muted-foreground mb-8">What our customers say about us</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl shadow-sm border">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground mb-3">"{review.text}"</p>
              <div className="text-xs text-muted-foreground">
                <p className="font-semibold">{review.name}</p>
                <p>{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
