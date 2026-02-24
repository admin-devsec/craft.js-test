import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Craft.js Builder',
  description: 'Next.js + Tailwind + Craft.js page builder'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
