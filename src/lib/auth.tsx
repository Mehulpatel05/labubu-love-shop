import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { ref, get, set, increment } from "firebase/database";

const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE as string;
const OTP_MAX_ATTEMPTS = 3;
const OTP_WINDOW_MS = 5 * 60 * 1000;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export async function checkOtpRateLimit(phone: string): Promise<{ allowed: boolean; waitSeconds: number }> {
  try {
    const snap = await get(ref(db, `otp_rate_limit/${phone}`));
    if (!snap.exists()) return { allowed: true, waitSeconds: 0 };
    const { count, window_start } = snap.val();
    const elapsed = Date.now() - window_start;
    if (elapsed > OTP_WINDOW_MS) return { allowed: true, waitSeconds: 0 };
    if (count >= OTP_MAX_ATTEMPTS) {
      return { allowed: false, waitSeconds: Math.ceil((OTP_WINDOW_MS - elapsed) / 1000) };
    }
    return { allowed: true, waitSeconds: 0 };
  } catch {
    return { allowed: true, waitSeconds: 0 };
  }
}

export async function recordOtpAttempt(phone: string) {
  try {
    const snap = await get(ref(db, `otp_rate_limit/${phone}`));
    if (!snap.exists() || Date.now() - snap.val().window_start > OTP_WINDOW_MS) {
      await set(ref(db, `otp_rate_limit/${phone}`), { count: 1, window_start: Date.now() });
    } else {
      await set(ref(db, `otp_rate_limit/${phone}/count`), increment(1));
    }
  } catch { /* silent */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async (userId: string) => {
    try {
      const adminSnap = await get(ref(db, `admin_uids/${userId}`));
      if (adminSnap.exists()) { setIsAdmin(true); return; }
      const profileSnap = await get(ref(db, `profiles/${userId}`));
      if (profileSnap.exists() && profileSnap.val().phone === ADMIN_PHONE) {
        setIsAdmin(true); return;
      }
      setIsAdmin(false);
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) await checkAdmin(user.uid);
      else setIsAdmin(false);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
