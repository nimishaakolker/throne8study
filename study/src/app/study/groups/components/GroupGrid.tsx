"use client";

import React, { useState } from 'react';
import GroupCard from './GroupCard';
import type { Group } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GroupGridProps {
  title: string;
  subtitle?: string;
  groups: Group[];
}

const GroupGrid: React.FC<GroupGridProps> = ({ title, subtitle, groups }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Initial cards to show: 3 on desktop, 2 on mobile
  const initialDesktopCards = 3;
  const initialMobileCards = 2;
  
  // Determine which cards to display
  const displayedGroups = showAll ? groups : groups.slice(0, initialDesktopCards);
  const hasMoreGroups = groups.length > initialDesktopCards;

  return (
    <section>
      {/* Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a3728] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#6b5847]/80">
            {subtitle}
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {displayedGroups && displayedGroups.length > 0 ? (
          displayedGroups.map((g, index) => (
            <div 
              key={g.id} 
              className={`${
                // Hide 3rd card on mobile when not showing all
                !showAll && index >= initialMobileCards ? 'hidden lg:block' : ''
              }`}
            >
              <GroupCard group={g as Group} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No groups found.</p>
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {hasMoreGroups && (
        <div className="flex justify-center mt-8">
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
    </section>
  );
};

export default GroupGrid;