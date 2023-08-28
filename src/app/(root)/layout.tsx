import React from 'react';
import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Topbar from '../../components/topbar';
import RightSidebar from '../../components/right-sidebar';
import LeftSidebar from '../../components/left-sidebar';
import Footer from '../../components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
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
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
