import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import ReduxProvider from '@/lib/redux/provider';

export const metadata: Metadata = {
  title: {
    default: "Throne8 Study",
    template: "%s | Throne8 Study",
  },
  description: "Study smarter with Throne8 — groups, timer, goals and more.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f7f3ee",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f3ee] antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
