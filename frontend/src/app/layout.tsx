import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AcademyProvider } from '@/context/AcademyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Apex Flow | Online Learning Academy',
  description: 'Learn programming, languages, math, databases, networking, and machine learning with step-by-step interactive lessons and verified certificates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 antialiased min-h-screen flex flex-col selection:bg-indigo-500/20 selection:text-indigo-900">
        <AuthProvider>
          <AcademyProvider>
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </AcademyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
