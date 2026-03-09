import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const fromCheckout = (location.state as any)?.fromCheckout;

  if (user) {
    if (fromCheckout) {
      navigate("/checkout", { replace: true, state: { fromCheckout: true } });
    } else {
      navigate("/", { replace: true });
    }
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (fromCheckout) {
        navigate("/checkout", { state: { fromCheckout: true } });
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold text-foreground">Welcome Back 🧸</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {fromCheckout ? "Login to place your order" : "Login to your account"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Email or Username"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold shadow-cute hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" state={fromCheckout ? { fromCheckout: true } : undefined} className="text-primary font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}
