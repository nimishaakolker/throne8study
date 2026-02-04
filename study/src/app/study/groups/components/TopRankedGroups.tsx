"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, ChevronLeft, ChevronRight, TrendingUp, Users, Award } from "lucide-react";

/* ===================== DATA ===================== */
type Group = {
  id: number;
  title: string;
  leader: string;
  members: number;
  capacity: number;
  attendanceAvg: number;
  rank: number;
  imgUrl: string;
};

const groups: Group[] = [
  { id: 1, title: "Focus JEE Warriors", leader: "Aman Sharma", members: 15, capacity: 30, attendanceAvg: 82, rank: 1, imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { id: 2, title: "NEET Night Study Club", leader: "Riya Verma", members: 20, capacity: 25, attendanceAvg: 74, rank: 2, imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
  { id: 3, title: "DSA Placement Prep", leader: "Kunal Mehta", members: 32, capacity: 40, attendanceAvg: 68, rank: 3, imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
  { id: 4, title: "Language Skills Booster", leader: "Neha Singh", members: 10, capacity: 20, attendanceAvg: 91, rank: 4, imgUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop" },
  { id: 5, title: "UPSC Morning Momentum", leader: "Priya Patel", members: 12, capacity: 15, attendanceAvg: 88, rank: 5, imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
  { id: 6, title: "Code & Coffee", leader: "Arjun Kumar", members: 28, capacity: 35, attendanceAvg: 65, rank: 6, imgUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop" },
  { id: 7, title: "CA Foundation Focus", leader: "Sneha Desai", members: 18, capacity: 20, attendanceAvg: 79, rank: 7, imgUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop" },
  { id: 8, title: "Medical Boards Prep", leader: "Dr. Rajesh", members: 22, capacity: 25, attendanceAvg: 85, rank: 8, imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" }
];

const rankedGroups = [...groups].sort((a, b) => a.rank - b.rank);

/* ===================== CARD COMPONENT ===================== */
type GroupCardProps = {
  group: Group;
};

const GroupCard = ({ group }: GroupCardProps) => {
  const spotsLeft = group.capacity - group.members;

  return (
    <div className="relative bg-white shadow-lg rounded-2xl p-5 w-72 mx-auto hover:shadow-2xl transition-shadow duration-300 border border-[#e0d8cf]">

      {/* Small Image - Top Left */}
      <div className="absolute -left-4 -top-4 w-20 h-24 rounded-xl overflow-hidden shadow-xl border-4 border-white">
        <Image
          src={group.imgUrl}
          alt={group.leader}
          width={80}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Rank Badge - Top Right */}
      <div className="absolute -top-3 -right-3 w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center border-2 border-white">
        <span className="text-white font-bold text-xs">#{group.rank}</span>
      </div>

      {/* Content */}
      <div className="ml-16 text-right">
        <h2 className="text-base text-[#4a3728] font-bold mb-1 leading-tight">{group.title}</h2>
        <p className="text-xs text-[#8b7355] mb-3 flex items-center justify-end gap-1">
          <Award className="w-3 h-3" />
          <span className="italic">{group.leader}</span>
        </p>

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between bg-[#fff8f0] px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#8b7355]" />
              <span className="text-xs text-[#8b7355]">Attendance</span>
            </div>
            <span className="text-sm font-bold text-[#4a3728]">{group.attendanceAvg}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#fff8f0] px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8b7355]" />
              <span className="text-xs text-[#8b7355]">Members</span>
            </div>
            <span className="text-sm font-bold text-[#4a3728]">{group.members}/{group.capacity}</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-3">
          {spotsLeft > 0 ? (
            <span className="inline-block bg-green-50 text-green-700 font-semibold text-xs px-3 py-1 rounded-full border border-green-200">
              {spotsLeft} spots left
            </span>
          ) : (
            <span className="inline-block bg-red-50 text-red-600 font-semibold text-xs px-3 py-1 rounded-full border border-red-200">
              Full
            </span>
          )}
        </div>

        {/* Join Button */}
        <button className="w-full bg-gradient-to-r from-[#4a3728] to-[#8b7355] hover:from-[#6b4e3d] hover:to-[#4a3728] text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300">
          Join Group
        </button>
      </div>
    </div>
  );
};

/* ===================== MAIN PAGE ===================== */
export default function TopRankedGroups() {
  const [page, setPage] = useState<number>(0);
  const perPage = 3;
  const totalPages = Math.ceil(rankedGroups.length / perPage);

  const current = rankedGroups.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="py-10 mt-4 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#4a3728] flex justify-center items-center gap-3">
            <Trophy className="text-yellow-500 w-9 h-9" />
            Top Ranked Groups
          </h1>
          <p className="text-[#6b5847] text-base">
            Join the most active and successful study communities
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-6">
          {current.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 pt-6">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:scale-110 transition-all shadow-md"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-1.5">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  page === idx 
                    ? 'bg-gradient-to-r from-[#4a3728] to-[#8b7355] w-6' 
                    : 'w-2 bg-[#d4c4b0] hover:bg-[#8b7355]'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-full bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:scale-110 transition-all shadow-md"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center">
          <span className="text-xs font-medium text-[#6b5847] bg-white/60 px-3 py-1 rounded-full">
            Page {page + 1} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
