import { supabase } from "./supabase";

export async function signup(email: string, password: string) {
  const res = await supabase.auth.signUp({ email, password });
  if (res.error) throw res.error;
  return res;
}

export async function login(email: string, password: string) {
  const res = await supabase.auth.signInWithPassword({ email, password });
  if (res.error) throw res.error;
  return res;
}

export async function logout() {
  const res = await supabase.auth.signOut();
  if (res.error) throw res.error;
  return res;
}

export function onAuthChanged(cb: (u: any) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user ?? null);
  });
  return () => data.subscription.unsubscribe();
}
