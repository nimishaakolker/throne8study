"use client";

import { useState } from "react";
import { Globe, Users, ChevronRight, ChevronLeft } from "lucide-react";

/* ---------- DATA ---------- */
const publicGroups = [
  { id: 1, title: "Delhi University Placement Prep", members: 214 },
  { id: 2, title: "Mumbai Web Development Circle", members: 168 },
  { id: 3, title: "Chennai Aptitude Masters", members: 142 },
  { id: 4, title: "Pune Core CS Study Group", members: 196 },
  { id: 5, title: "Bangalore Interview Practice Hub", members: 233 },
  { id: 6, title: "Hyderabad DSA Daily Practice", members: 187 }
];

const ITEMS_PER_PAGE = 3;

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
  <div className="w-[320px] bg-white rounded-2xl border-2 border-[#e0d8cf] p-5 hover:border-[#8b7355] hover:shadow-lg transition flex-shrink-0">
    <h3 className="text-lg font-bold text-[#4a3728] line-clamp-2">{title}</h3>
    <div className="flex items-center gap-2 mt-2 text-sm text-[#6b5847]">
      <Users size={14} className="text-[#8b7355]" />
      {members}+ active members
    </div>
    <p className="mt-3 text-sm text-[#6b5847]">Public group. Join instantly.</p>
    <button className="mt-4 w-full py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white hover:from-[#6b5847] hover:to-[#4a3728]">
      Join Now
    </button>
  </div>
);

/* ---------- MAIN COMPONENT ---------- */
export default function EasyJoinPublicGroups() {
  const [page, setPage] = useState<number>(0);
  const totalPages = Math.ceil(publicGroups.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  // Slice the groups for current page
  const visibleGroups = publicGroups.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <div className="mt-14 space-y-6 relative">
      {/* HEADING */}
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
          <Globe className="text-[#8b7355]" />
          <h2 className="text-3xl font-bold text-[#4a3728]">
            Public Groups You Can Join Easily
          </h2>
        </div>
        <p className="text-sm text-[#6b5847]">
          Open groups with instant access. No approval required.
        </p>
      </div>

      {/* CARDS CENTERED WITH ARROWS */}
      <div className="flex justify-center items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="p-2 rounded-full bg-white shadow hover:bg-[#f0e8e0] disabled:opacity-50 transition"
        >
          <ChevronLeft className="text-[#8b7355]" />
        </button>

        {/* Cards */}
        <div className="flex gap-6">
          {visibleGroups.map((group) => (
            <PublicGroupCard
              key={group.id}
              title={group.title}
              members={group.members}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="p-2 rounded-full bg-white shadow hover:bg-[#f0e8e0] disabled:opacity-50 transition"
        >
          <ChevronRight className="text-[#8b7355]" />
        </button>
      </div>
    </div>
  );
}
