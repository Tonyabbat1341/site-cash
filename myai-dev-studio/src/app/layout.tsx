import type { Metadata } from 'next';
import './globals.css';
import { clsx } from 'clsx';

export const metadata: Metadata = {
  title: 'MyAI Dev Studio',
  description: 'MVP: AI agents + visual workflows + Supabase + Stripe'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={clsx('min-h-screen bg-background text-foreground')}>{children}</body>
    </html>
  );
}

