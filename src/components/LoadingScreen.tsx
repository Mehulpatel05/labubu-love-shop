import { useEffect, useState } from "react";
import mascotImg from "@/assets/labubu-earphone-case.webp";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    const done = setTimeout(onComplete, 2300);
    return () => { clearTimeout(timer); clearTimeout(done); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-loading transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <img
        src={mascotImg}
        alt="Labubu mascot"
        className="w-32 h-32 object-contain animate-bounce-cute drop-shadow-lg"
      />
      <p className="mt-6 font-display text-xl font-bold text-foreground">
        Loading cuteness...
      </p>
      <div className="mt-4 h-1 w-40 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-[fade-up_2s_ease-in-out]" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
