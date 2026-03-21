import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { auth, db } from "@/lib/firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { ref, set, get, remove } from "firebase/database";
import { Phone, ArrowRight, RotateCcw, CheckCircle2, Sparkles } from "lucide-react";

type Step = "phone" | "otp" | "name";

const FAST2SMS_KEY = import.meta.env.VITE_FAST2SMS_KEY;

async function sendOtpSms(phone: string, otp: string) {
  if (!FAST2SMS_KEY) {
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
    return;
  }
  await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: {
      authorization: FAST2SMS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: "q",
      message: `Your Labubu Store OTP is ${otp}. Valid for 2 minutes. Do not share.`,
      language: "english",
      flash: 0,
      numbers: phone,
    }),
  });
}

export default function Login() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [animating, setAnimating] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const fromCheckout = (location.state as any)?.fromCheckout;

  useEffect(() => {
    if (user) {
      fromCheckout
        ? navigate("/checkout", { replace: true, state: { fromCheckout: true } })
        : navigate("/", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const goToStep = (next: Step) => {
    setAnimating(true);
    setTimeout(() => { setStep(next); setAnimating(false); }, 300);
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) return setError("Please enter a valid 10-digit number");
    setError("");
    setLoading(true);
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      // Store OTP in Firebase with 2 min expiry
      await set(ref(db, `otp_store/${phone}`), {
        otp: generatedOtp,
        expires: Date.now() + 2 * 60 * 1000,
      });
      await sendOtpSms(phone, generatedOtp);
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      goToStep("otp");
    } catch {
      setError("Failed to send OTP. Try again.");
    }
    setLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return setError("Enter all 6 digits");
    setError("");
    setLoading(true);
    try {
      const snap = await get(ref(db, `otp_store/${phone}`));
      if (!snap.exists()) throw new Error("OTP not found. Please resend.");
      const { otp: storedOtp, expires } = snap.val();
      if (Date.now() > expires) {
        await remove(ref(db, `otp_store/${phone}`));
        throw new Error("OTP expired. Please resend.");
      }
      if (storedOtp !== otpValue) throw new Error("Wrong OTP. Try again.");
      await remove(ref(db, `otp_store/${phone}`));

      // Check if returning user
      const userSnap = await get(ref(db, `phone_users/${phone}`));
      if (userSnap.exists()) {
        await signInAnonymously(auth);
        await updateProfile(auth.currentUser!, { displayName: userSnap.val().name });
        fromCheckout
          ? navigate("/checkout", { state: { fromCheckout: true } })
          : navigate("/");
      } else {
        goToStep("name");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed");
    }
    setLoading(false);
  };

  const handleCreateAccount = async () => {
    if (name.trim().length < 2) return setError("Please enter your name");
    setError("");
    setLoading(true);
    try {
      await signInAnonymously(auth);
      const currentUser = auth.currentUser!;
      await updateProfile(currentUser, { displayName: name.trim() });
      await set(ref(db, `phone_users/${phone}`), {
        name: name.trim(),
        phone,
        uid: currentUser.uid,
        created_at: new Date().toISOString(),
      });
      await set(ref(db, `profiles/${currentUser.uid}`), {
        full_name: name.trim(),
        phone,
        created_at: new Date().toISOString(),
      });
      fromCheckout
        ? navigate("/checkout", { state: { fromCheckout: true } })
        : navigate("/");
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const floatingEmojis = ["🧸", "✨", "💕", "🌸", "⭐"];

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Floating background emojis */}
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-2xl select-none pointer-events-none opacity-20"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Gradient blobs */}
      <div className="absolute top-10 left-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div
        className="w-full max-w-sm relative z-10"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="bg-card rounded-3xl shadow-cute-lg border border-border/50 p-7 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-1 animate-float">
              {step === "phone" && <Phone className="h-7 w-7 text-primary" />}
              {step === "otp" && <Sparkles className="h-7 w-7 text-primary" />}
              {step === "name" && <CheckCircle2 className="h-7 w-7 text-primary" />}
            </div>
            <h1 className="font-display text-2xl font-extrabold text-foreground">
              {step === "phone" && "Welcome 🧸"}
              {step === "otp" && "Enter OTP ✨"}
              {step === "name" && "Almost There 💕"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === "phone" && (fromCheckout ? "Login to place your order" : "Login or create account")}
              {step === "otp" && `OTP sent to +91 ${phone}`}
              {step === "name" && "Tell us your name to get started"}
            </p>
          </div>

          {/* Step: Phone */}
          {step === "phone" && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Mobile Number</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-border bg-muted/30 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all">
                  <span className="text-sm font-bold text-foreground">🇮🇳 +91</span>
                  <div className="w-px h-5 bg-border" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    placeholder="Enter 10-digit number"
                    autoFocus
                  />
                </div>
              </div>

              {error && <p className="text-xs text-destructive font-medium animate-fade-up">{error}</p>}

              <button
                onClick={handleSendOtp}
                disabled={loading || phone.length !== 10}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  <>Send OTP <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <div className="space-y-5 animate-fade-up">
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-11 h-12 text-center text-lg font-bold rounded-2xl border-2 bg-muted/30 text-foreground focus:outline-none transition-all
                      ${digit ? "border-primary bg-primary/10 scale-105" : "border-border"}
                      focus:border-primary focus:ring-2 focus:ring-primary/30`}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {error && <p className="text-xs text-destructive font-medium text-center animate-fade-up">{error}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.join("").length !== 6}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <>Verify OTP <CheckCircle2 className="h-4 w-4" /></>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  onClick={() => { goToStep("phone"); setOtp(["","","","","",""]); setError(""); }}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Change number
                </button>
                {resendTimer > 0 ? (
                  <span>Resend in {resendTimer}s</span>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-primary font-bold hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step: Name (new user only) */}
          {step === "name" && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                  placeholder="Enter your full name"
                  autoFocus
                />
              </div>

              {error && <p className="text-xs text-destructive font-medium animate-fade-up">{error}</p>}

              <button
                onClick={handleCreateAccount}
                disabled={loading || name.trim().length < 2}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-cute flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <>Start Shopping 🛍️</>
                )}
              </button>
            </div>
          )}

          {/* Step indicator */}
          <div className="flex justify-center gap-2 pt-1">
            {(["phone", "otp", "name"] as Step[]).map((s, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to our{" "}
          <a href="/terms-conditions" className="text-primary hover:underline">Terms</a> &{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </section>
  );
}
