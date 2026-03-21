import { useEffect, useState } from "react";
import mascotImg from "@/assets/labubu-earphone-case.webp";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth progress bar
    const steps = [15, 35, 60, 80, 95, 100];
    const timings = [100, 250, 450, 700, 1100, 1500];
    const timers = steps.map((val, i) =>
      setTimeout(() => setProgress(val), timings[i])
    );
    const fadeTimer = setTimeout(() => setFadeOut(true), 1700);
    const doneTimer = setTimeout(onComplete, 2100);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(350 60% 94%) 0%, hsl(30 50% 96%) 50%, hsl(350 50% 92%) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />

      {/* Logo + mascot */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div
          className="relative"
          style={{ animation: "loader-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
        >
          <div className="w-24 h-24 rounded-3xl bg-white shadow-cute-lg flex items-center justify-center">
            <img
              src={mascotImg}
              alt="Labubu"
              className="w-16 h-16 object-contain"
              style={{ animation: "loader-float 2s ease-in-out infinite" }}
            />
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl -z-10 scale-110" />
        </div>

        {/* Brand name */}
        <div
          className="text-center"
          style={{ animation: "loader-fade-up 0.5s 0.3s ease-out both" }}
        >
          <p className="font-display text-2xl font-extrabold text-foreground tracking-tight">
            🧸 Labubu Store
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Cute accessories for your tech
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-48 mt-2"
          style={{ animation: "loader-fade-up 0.5s 0.5s ease-out both" }}
        >
          <div className="h-1 w-full bg-primary/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-1.5 font-medium">
            {progress < 100 ? "Loading..." : "Ready! ✨"}
          </p>
        </div>
      </div>
    </div>
  );
}
