import React from 'react';
import { Users, Clock, Eye, EyeOff, Camera, CameraOff, TrendingUp, Award } from 'lucide-react';

// --- Types ---
interface Group {
  title: string;
  description: string;
  category: string;
  rank: number;
  visibility: 'public' | 'private';
  cameraOn: boolean;
  members: number;
  capacity: number;
  leader: string;
  goalHours: number;
  attendanceAvg: number;
}

// --- Props ---
interface GroupCardProps {
  group: Group;
}

// --- Helper: Generate avatars ---
const generateMemberAvatars = (count: number): string[] => {
  const names = [
    'Priya Kumar', 'Rahul Patel', 'Ananya Das', 'Arjun Singh', 
    'Sneha Reddy', 'Vikram Joshi', 'Ishita Kapoor', 'Rohan Gupta'
  ];
  
  return Array.from({ length: Math.min(count, 3) }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d4a574&color=fff&size=128`;
  });
};

// --- Component ---
const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const memberAvatars = generateMemberAvatars(group.members);
  const spotsLeft = group.capacity - group.members;
  const isFilling = (group.members / group.capacity) > 0.7;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#d4a574]">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-[#4a3728] via-[#8b6f47] to-[#d4a574]" />

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-[#4a3728] line-clamp-1">
                {group.title}
              </h3>
              {group.rank <= 3 && (
                <Award className="w-4 h-4 text-[#d4a574] fill-[#d4a574] flex-shrink-0" />
              )}
            </div>
            <span className="inline-block bg-[#4a3728] text-white px-2 py-0.5 rounded-full text-xs font-medium">
              {group.category}
            </span>
          </div>
          
          <div className="flex gap-1.5 ml-2">
            <div className={`p-1.5 rounded ${group.visibility === 'public' ? 'bg-[#8b6f47]/10' : 'bg-gray-100'}`}>
              {group.visibility === 'public' ? (
                <Eye className="w-3.5 h-3.5 text-[#4a3728]" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-gray-600" />
              )}
            </div>
            <div className={`p-1.5 rounded ${group.cameraOn ? 'bg-[#8b6f47]/10' : 'bg-gray-100'}`}>
              {group.cameraOn ? (
                <Camera className="w-3.5 h-3.5 text-[#4a3728]" />
              ) : (
                <CameraOff className="w-3.5 h-3.5 text-gray-600" />
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
          {group.description}
        </p>

        {/* Member Avatars */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {memberAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt={`Member ${idx + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              />
            ))}
          </div>
          <div className="text-xs">
            <p className="text-[#4a3728] font-semibold">{group.members} members</p>
            <p className="text-gray-500">by {group.leader}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#8b6f47]" />
              <span className="text-xs text-gray-600">Goal</span>
            </div>
            <p className="text-lg font-bold text-[#4a3728]">{group.goalHours}h</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#8b6f47]" />
              <span className="text-xs text-gray-600">Attendance</span>
            </div>
            <p className="text-lg font-bold text-[#4a3728]">{group.attendanceAvg}%</p>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600 font-medium">
              {group.members}/{group.capacity} joined
            </span>
            <span className="text-xs text-gray-500">
              {spotsLeft} left
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFilling 
                  ? 'bg-gradient-to-r from-[#d4a574] to-[#8b6f47]' 
                  : 'bg-gradient-to-r from-[#8b6f47] to-[#4a3728]'
              }`}
              style={{ width: `${(group.members / group.capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Join Button */}
        <button className="w-full bg-gradient-to-r from-[#4a3728] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#4a3728] text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md">
          Join Group
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
