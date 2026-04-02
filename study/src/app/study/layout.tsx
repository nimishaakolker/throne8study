import { ReactNode } from "react";
import StudySidebar from "../components/study/sidebar/StudySidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function StudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">

      <StudySidebar />

      {/* pt-14 on mobile = clears the tab slider bar; lg:pt-0 = no top bar (sidebar handles nav) */}
      <main
        className="min-h-screen
          ml-0 lg:ml-72
          pt-14 lg:pt-0
          pb-20 lg:pb-0
        "
      >
        {children}
      </main>

      <MobileBottomNav />

    </div>
  );
}
