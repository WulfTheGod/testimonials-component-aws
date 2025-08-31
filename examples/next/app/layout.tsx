import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials Example',
  description: 'Example usage of the testimonials component',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}