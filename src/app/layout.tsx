import '@/styles/global.css';

import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`bg-white ${inter.className}`}>{children}</body>
    </html>
  );
}
