// layout.tsx (Server Component)
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/navigation/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Labour Management System',
  description: 'Manage your labour workforce efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
