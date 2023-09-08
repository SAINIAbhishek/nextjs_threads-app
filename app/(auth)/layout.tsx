import React from 'react';
import type { Metadata } from 'next';
import '../../styles/globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth | Threads',
  description:
    'It is a learning project. It showcase a clone of FullStack MERN Next.js Threads Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="main-container">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
