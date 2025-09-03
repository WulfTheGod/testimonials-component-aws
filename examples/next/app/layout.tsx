import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  );
}