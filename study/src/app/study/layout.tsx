import { ReactNode } from "react";
import Link from "next/link";
import StudySidebar from "../components/study/sidebar/StudySidebar";

export default function StudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

     <StudySidebar/>
      {/* Main Content */}
      <main className="ml-0 md:ml-64 flex-1">
        {children}
      </main>

    </div>
  );
}
