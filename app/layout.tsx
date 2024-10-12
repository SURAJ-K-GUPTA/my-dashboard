export const metadata = {
  title: 'My Dashboard',
  description: 'Interactive dashboard with Supabase, Recharts, and Next.js',
};

import './globals.css';  // Import Tailwind CSS

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
