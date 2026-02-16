import "./globals.css";
import { ReactNode } from "react";
import ReduxProvider from '@/lib/redux/provider'


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f3ee]">
        <ReduxProvider>
      {children}
        </ReduxProvider>
  
      </body>
    </html>
  );
}