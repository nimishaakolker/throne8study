import { ReactNode } from "react";
import StudySidebar from "../components/study/sidebar/StudySidebar";

export default function StudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      {/* Sidebar - fixed, no scrollbar */}
      <StudySidebar />
      
      {/* Main Content - this scrolls, not the sidebar */}
      <main className="min-h-screen
        ml-0 lg:ml-72
        pt-16 lg:pt-0
      ">
        {children}
      </main>
    </div>
  );
}