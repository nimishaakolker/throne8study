"use client";

import { useState } from "react";
import { Globe, Users } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
/* ---------- DATA ---------- */
const publicGroups = [
  { id: 1, title: "Delhi University Placement Prep", members: 214 },
  { id: 2, title: "Mumbai Web Development Circle", members: 168 },
  { id: 3, title: "Chennai Aptitude Masters", members: 142 },
  { id: 4, title: "Pune Core CS Study Group", members: 196 },
  { id: 5, title: "Bangalore Interview Practice Hub", members: 233 },
  { id: 6, title: "Hyderabad DSA Daily Practice", members: 187 }
];

/* ---------- TYPES ---------- */
interface PublicGroup {
  id: number;
  title: string;
  members: number;
}

interface PublicGroupCardProps {
  title: string;
  members: number;
}

/* ---------- CARD ---------- */
const PublicGroupCard: React.FC<PublicGroupCardProps> = ({ title, members }) => (
  <div className="backdrop-blur-xl bg-white/70 rounded-2xl border-2 border-white/60 p-5 hover:border-[#8b7355]/50 hover:shadow-2xl transition-all duration-300 w-full">
    <div className="flex items-start gap-3 mb-3">
      <div className="p-2.5 rounded-xl bg-[#8b7355]/10 backdrop-blur-sm border border-[#8b7355]/20">
        <Globe className="w-5 h-5 text-[#8b7355]" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-[#4a3728] line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
    </div>
    
    <div className="flex items-center gap-2 mb-3 text-sm text-[#6b5847] backdrop-blur-sm bg-[#fff8f0]/50 px-3 py-2 rounded-lg border border-white/40">
      <Users size={16} className="text-[#8b7355] flex-shrink-0" />
      <span className="font-semibold">{members}+ active members</span>
    </div>
    
    <p className="text-xs sm:text-sm text-[#6b5847] mb-4">
      Public group • Join instantly
    </p>
    
    <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white hover:from-[#6b5847] hover:to-[#4a3728] transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
      Join Now
    </button>
  </div>
);

/* ---------- MAIN COMPONENT ---------- */
export default function PublicStudyGroups() {
  const [showAll, setShowAll] = useState<boolean>(false);
  
  // Show 3 groups initially on desktop, 3 on mobile/tablet
  const initialCount = 3;
  const displayedGroups = showAll ? publicGroups : publicGroups.slice(0, initialCount);
  const hasMore = publicGroups.length > initialCount;

  return (
    <div className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADING with proper Globe icon */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-3">
           
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a3728]">
              Public Groups
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6b5847]">
            Open groups with instant access • No approval required
          </p>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedGroups.map((group) => (
            <PublicGroupCard
              key={group.id}
              title={group.title}
              members={group.members}
            />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
           className="px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/20"
            >
              {showAll ? (
              <>
                Show Less
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show More
                <ChevronDown size={18} />
              </>
            )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}