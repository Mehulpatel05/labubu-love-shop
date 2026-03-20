import { Star, MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get, push, set } from "firebase/database";
import { useAuth } from "@/lib/auth";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  location: string;
  created_at: string;
}

export default function ReviewsSection() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, text: "", location: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    get(ref(db, "reviews")).then((snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const list = Object.entries(data)
          .map(([id, val]: [string, any]) => ({ id, ...val }))
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 8);
        setReviews(list as Review[]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim() || !form.name.trim()) return;
    setSubmitting(true);
    const newRef = push(ref(db, "reviews"));
    await set(newRef, { ...form, created_at: new Date().toISOString() });
    setReviews((prev) => [{ id: newRef.key!, ...form, created_at: new Date().toISOString() }, ...prev].slice(0, 8));
    setForm({ name: "", rating: 5, text: "", location: "" });
    setShowForm(false);
    setSubmitting(false);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-2">⭐ Customer Reviews</h2>
        <p className="text-center text-muted-foreground mb-6">What our customers say about us</p>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute hover:scale-105 active:scale-95 transition-all"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Write a Review
          </button>
        </div>

        {showForm && (
          <form onSubmit={submitReview} className="max-w-md mx-auto mb-10 bg-card rounded-2xl border p-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Your Name</label>
                <input className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Priya S." required />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">City</label>
                <input className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Mumbai" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setForm((f) => ({ ...f, rating: s }))}>
                    <Star className={`h-6 w-6 transition-colors ${s <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Your Review</label>
              <textarea className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]" value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} placeholder="Share your experience..." required />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={submitting} className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50">
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-full border font-bold text-sm text-muted-foreground hover:bg-muted">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-card p-6 rounded-2xl border animate-pulse h-36" />)}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card p-6 rounded-2xl shadow-sm border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3">"{review.text}"</p>
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold">{review.name}</p>
                  {review.location && <p>{review.location}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
