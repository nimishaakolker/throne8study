import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f3ee]">
        {children}
      </body>
    </html>
  );
}