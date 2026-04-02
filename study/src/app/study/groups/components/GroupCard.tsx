import React from 'react';
import { Users, Clock, Eye, EyeOff, Camera, CameraOff, TrendingUp, Award } from 'lucide-react';
import type { Group } from '../types';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/hooks';
import { joinGroup, unjoinGroup, selectJoinedGroupIds } from '../../../../lib/redux/features/groups/groupsSlice';

const generateMemberAvatars = (count: number): string[] => {
  const names = [
    'Priya Kumar', 'Rahul Patel', 'Ananya Das', 'Arjun Singh',
    'Sneha Reddy', 'Vikram Joshi', 'Ishita Kapoor', 'Rohan Gupta',
  ];
  return Array.from({ length: Math.min(count, 3) }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d4a574&color=fff&size=128`;
  });
};

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const dispatch    = useAppDispatch();
  const joinedIds   = useAppSelector(selectJoinedGroupIds);
  const isJoined    = joinedIds.includes(group.id);
  const memberAvatars = generateMemberAvatars(group.members);
  const spotsLeft   = group.capacity - group.members;
  const isFilling   = group.members / group.capacity > 0.7;
  const isFull      = spotsLeft <= 0;

  const handleJoinLeave = () => {
    if (isJoined) dispatch(unjoinGroup(group.id));
    else if (!isFull) dispatch(joinGroup(group.id));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#d4a574]">
      <div className="h-1 bg-gradient-to-r from-[#4a3728] via-[#8b6f47] to-[#d4a574]" />

      <div className="p-3 sm:p-4">

        {/* Header */}
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-sm sm:text-base font-bold text-[#4a3728] line-clamp-1">{group.title}</h3>
              {group.rank <= 3 && (
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4a574] fill-[#d4a574] flex-shrink-0" />
              )}
            </div>
            <span className="inline-block bg-[#4a3728] text-white px-2 py-0.5 rounded-full text-[10px] font-medium">
              {group.category}
            </span>
          </div>
          <div className="flex gap-1 ml-1.5 flex-shrink-0">
            <div className={`p-1 rounded ${group.visibility === 'public' ? 'bg-[#8b6f47]/10' : 'bg-gray-100'}`}>
              {group.visibility === 'public'
                ? <Eye className="w-3 h-3 text-[#4a3728]" />
                : <EyeOff className="w-3 h-3 text-gray-600" />
              }
            </div>
            <div className={`p-1 rounded ${group.cameraOn ? 'bg-[#8b6f47]/10' : 'bg-gray-100'}`}>
              {group.cameraOn
                ? <Camera className="w-3 h-3 text-[#4a3728]" />
                : <CameraOff className="w-3 h-3 text-gray-600" />
              }
            </div>
          </div>
        </div>

        {/* Description — hidden on mobile */}
        <p className="hidden sm:block text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
          {group.description}
        </p>

        {/* Avatars */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="flex -space-x-1.5">
            {memberAvatars.map((avatar, idx) => (
              <img key={idx} src={avatar} alt="" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-sm" />
            ))}
          </div>
          <div className="text-xs">
            <p className="text-[#4a3728] font-semibold">{group.members} members</p>
            <p className="text-gray-500 hidden sm:block">by {group.leader}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5 mb-2 sm:mb-3">
          <div className="bg-gray-50 rounded-lg p-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-[#8b6f47]" />
              <span className="text-[10px] text-gray-500">Goal</span>
            </div>
            <p className="text-sm font-bold text-[#4a3728]">{group.goalHours}h</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <TrendingUp className="w-3 h-3 text-[#8b6f47]" />
              <span className="text-[10px] text-gray-500">Attend.</span>
            </div>
            <p className="text-sm font-bold text-[#4a3728]">{group.attendanceAvg}%</p>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-2 sm:mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-gray-500">{group.members}/{group.capacity}</span>
            <span className="text-[10px] text-gray-400">{spotsLeft} left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
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

        {/* Button */}
        <button
          onClick={handleJoinLeave}
          disabled={isFull && !isJoined}
          className={`w-full font-semibold py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
            isJoined
              ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
              : isFull
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#4a3728] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#4a3728] text-white'
          }`}
        >
          {isJoined ? 'Leave Group' : isFull ? 'Full' : 'Join Group'}
        </button>

      </div>
    </div>
  );
};

export default GroupCard;
