import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import Analytics from '../components/GoogleAnalytics';
import KoalaAnalytics from '../components/KoalaAnalytics';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const koalaApiKey = process.env.NEXT_PUBLIC_KOALA_PUBLIC_API_KEY;
  
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
        {gaId && <Analytics gaId={gaId} />}
        {koalaApiKey && <KoalaAnalytics apiKey={koalaApiKey} />}
      </body>
    </html>
  );
}
