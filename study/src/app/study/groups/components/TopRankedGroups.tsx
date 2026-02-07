"use client";

import Image from "next/image";
import { TrendingUp, Users, Award } from "lucide-react";

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
    <div className="relative backdrop-blur-xl bg-white/70 shadow-xl rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 border-2 border-white/60 h-full">

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
      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg flex items-center justify-center border-2 border-white">
        <span className="text-white font-bold text-sm">#{group.rank}</span>
      </div>

      {/* Content */}
      <div className="ml-16 text-right pt-2">
        <h2 className="text-base text-[#4a3728] font-bold mb-1 leading-tight">{group.title}</h2>
        <p className="text-xs text-[#8b7355] mb-3 flex items-center justify-end gap-1">
          <Award className="w-3 h-3" />
          <span className="italic">{group.leader}</span>
        </p>

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between backdrop-blur-sm bg-[#fff8f0]/80 px-3 py-2 rounded-lg border border-white/40">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#8b7355]" />
              <span className="text-xs text-[#8b7355] font-medium">Attendance</span>
            </div>
            <span className="text-sm font-bold text-[#4a3728]">{group.attendanceAvg}%</span>
          </div>

          <div className="flex items-center justify-between backdrop-blur-sm bg-[#fff8f0]/80 px-3 py-2 rounded-lg border border-white/40">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#8b7355]" />
              <span className="text-xs text-[#8b7355] font-medium">Members</span>
            </div>
            <span className="text-sm font-bold text-[#4a3728]">{group.members}/{group.capacity}</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-3">
          {spotsLeft > 0 ? (
            <span className="inline-block bg-green-500/10 text-green-700 font-semibold text-xs px-3 py-1.5 rounded-full border border-green-500/20">
              {spotsLeft} spots left
            </span>
          ) : (
            <span className="inline-block bg-red-500/10 text-red-600 font-semibold text-xs px-3 py-1.5 rounded-full border border-red-500/20">
              Full
            </span>
          )}
        </div>

        {/* Join Button */}
        <button className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          Join Group
        </button>
      </div>
    </div>
  );
};

/* ===================== MAIN PAGE ===================== */
export default function TopRankedGroups() {
  // Show only top 3 ranked groups
  const topThreeGroups = rankedGroups.slice(0, 3);

  return (
    <div className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">

        {/* Header - Trophy removed */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a3728]">
            Top Ranked Groups
          </h1>
          <p className="text-[#6b5847] text-sm sm:text-base">
            Join the most active and successful study communities
          </p>
        </div>

        {/* Cards Grid - Simple 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {topThreeGroups.map(group => (
            <div key={group.id} className="max-w-[320px] mx-auto w-full">
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}