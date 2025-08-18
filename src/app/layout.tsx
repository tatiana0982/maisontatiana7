import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: 'Maison Tatiana 7 - L\'Art du Parfum',
  description: 'Born in France, guided by tradition, and touched by Arabic olfactory artistry. Discover the signature fragrances that linger, not fade.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
  keywords: 'perfume, fragrance, luxury, French perfume, Maison Tatiana 7',
  openGraph: {
    title: 'Maison Tatiana 7 - L\'Art du Parfum',
    description: 'Born in France, guided by tradition, and touched by Arabic olfactory artistry.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">
        {children}        
<script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Funiverses4507back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.6"></script>
</body>
    </html>
  );
}