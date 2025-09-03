import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'AWS Demo - Testimonials Component',
  description: 'Production-ready testimonials component with AWS integration',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 antialiased bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {children}
      </body>
    </html>
  );
}