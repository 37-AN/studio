"use client";

import { useEffect, useState } from "react";
import { login, signup, onAuthChanged, logout } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthChanged((u) => {
      setUser(u);
      if (u) router.push("/");
    });
    return () => unsub();
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError(null);
      await login(email, password);
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign in");
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError(null);
      await signup(email, password as string);
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign up");
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex gap-2">
          <button className="btn btn-primary" type="submit">Sign in</button>
          <button className="btn" onClick={handleSignup} type="button">Create account</button>
          {user && <button className="btn" onClick={() => logout()}>Sign out</button>}
        </div>
      </form>
    </div>
  );
}
