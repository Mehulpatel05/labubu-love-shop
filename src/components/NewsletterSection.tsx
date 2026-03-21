import { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container max-w-2xl text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-2">
          📧 Join Our Newsletter
        </h2>
        <p className="text-muted-foreground mb-6">
          Get exclusive offers, new product updates, and cute surprises in your inbox!
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            {subscribed ? "✓ Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
