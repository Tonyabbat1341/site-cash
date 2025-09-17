"use client";
import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';

export default function AuthPage() {
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth` }
    });
    if (error) setMessage(error.message);
    else setMessage('Email de connexion envoyé. Vérifiez votre boîte mail.');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <main className="p-6">
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Connexion</h1>
        {session ? (
          <div className="space-y-2">
            <div className="rounded-md border border-white/10 bg-white/5 p-3 text-sm">
              Connecté en tant que <span className="font-mono">{session.user.email}</span>
            </div>
            <button onClick={signOut} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Se déconnecter</button>
          </div>
        ) : (
          <form onSubmit={signIn} className="space-y-3">
            <input
              type="email"
              placeholder="email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 p-2"
              required
            />
            <button type="submit" className="rounded-md border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">Recevoir un lien magique</button>
            {message && <p className="text-xs opacity-80">{message}</p>}
          </form>
        )}
      </div>
    </main>
  );
}

