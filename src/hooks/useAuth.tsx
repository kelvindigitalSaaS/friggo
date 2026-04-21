/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.DEV) console.log("[AUTH] getSession: start");
    const t0 = performance.now();

    // onAuthStateChange fires INITIAL_SESSION synchronously before getSession
    // resolves, so we let it drive the initial state and skip the redundant
    // setUser from getSession when a session is already known.
    let initialSessionResolved = false;

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (import.meta.env.DEV) console.log("[AUTH] onAuthStateChange:", event, "hasSession=", !!session);
      if (event === "INITIAL_SESSION") {
        initialSessionResolved = true;
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // After email confirmation or first sign-in, the profiles table is 
      // automatically populated by the DB trigger 'on_auth_user_created'.
      // No manual frontend writes needed (Zero Leakage).

      // Redirect to login if signed out — only for protected /app/* routes
      if (event === "SIGNED_OUT" && !session) {
        const path = window.location.pathname;
        if (path.startsWith("/app")) {
          window.location.href = "/auth";
        }
      }
    });

    // getSession is a fallback: if INITIAL_SESSION already fired and resolved
    // the session, skip redundant state updates to prevent double fetchData.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (import.meta.env.DEV) console.log("[AUTH] getSession: done in", (performance.now() - t0).toFixed(0), "ms, hasSession=", !!session);
      if (!initialSessionResolved) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }).catch((err) => {
      if (import.meta.env.DEV) console.error("[AUTH] getSession: ERROR", err);
      // Force sign out on critical auth errors (like invalid refresh token)
      // to clear stale localStorage and stop console noise.
      const errMsg = err?.message?.toLowerCase() || "";
      if (errMsg.includes("invalid") || errMsg.includes("not found") || errMsg.includes("found")) {
        supabase.auth.signOut();
      }
      if (!initialSessionResolved) {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const requireAuth = () => {
    if (!user || !session) {
      const path = window.location.pathname;
      if (path.startsWith("/app") && path !== "/auth") {
        window.location.href = "/auth";
      }
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signOut, requireAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
