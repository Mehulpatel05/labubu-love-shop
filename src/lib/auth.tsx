import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { ref, get } from "firebase/database";

const ADMIN_PHONE = "8306590731";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async (userId: string) => {
    try {
      // Check by phone number in phone_users
      const snap = await get(ref(db, `profiles/${userId}`));
      if (snap.exists() && snap.val().phone === ADMIN_PHONE) {
        setIsAdmin(true);
        return;
      }
      // Fallback: check user_roles
      const roleSnap = await get(ref(db, `user_roles/${userId}`));
      setIsAdmin(roleSnap.exists() && roleSnap.val().role === "admin");
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkAdmin(user.uid);
      } else {
        setIsAdmin(false);
      }
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
