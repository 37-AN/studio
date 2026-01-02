"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      const session = (data as any)?.session;
      if (!session && mounted) {
        router.replace("/auth/login");
      } else if (mounted) {
        setChecked(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/auth/login");
    });
    return () => {
      sub?.subscription.unsubscribe();
      mounted = false;
    };
  }, [router]);

  if (!checked) return <div className="p-8">Checking authentication...</div>;
  return <>{children}</>;
}
