import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f3ee] ">
        <div className="min-h-screen">


          {/* Page Content */}
          <div className="pt-14 bg-[#f7f3ee]">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
