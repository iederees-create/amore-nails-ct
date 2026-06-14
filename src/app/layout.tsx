import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amore Nails & Beauty Lounge',
  description: 'Premium multi-branch nails, waxing, lashes, brows and massage services in Cape Town.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
