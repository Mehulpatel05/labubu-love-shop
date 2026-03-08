import { Shield, Sparkles, Feather, Gift } from "lucide-react";

const features = [
  { icon: Shield, title: "Soft Silicone Protection", desc: "Premium silicone that absorbs shocks" },
  { icon: Sparkles, title: "Cute Collectible Design", desc: "Adorable Labubu character styles" },
  { icon: Feather, title: "Lightweight & Durable", desc: "Easy to carry, built to last" },
  { icon: Gift, title: "Perfect Gift", desc: "Ideal present for any kawaii lover" },
];

export default function AboutSection() {
  return (
    <section className="py-16 gradient-hero">
      <div className="container space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">About Labubu Cases</h2>
          <p className="text-muted-foreground">
            Labubu accessories are designed to make your everyday tech fun, cute, and protected.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center space-y-3 p-5 bg-card rounded-2xl shadow-cute">
              <div className="h-12 w-12 rounded-full bg-blush flex items-center justify-center">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-sm text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
