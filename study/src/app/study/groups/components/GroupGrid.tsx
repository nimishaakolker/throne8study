"use client";

import React from 'react';
import GroupCard from './GroupCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  toggleSectionExpanded,
  selectExpandedSections,
  selectFilteredUniversityGroups,
  selectFilteredDsaGroups,
  selectFilteredJeeGroups,
} from '../redux/slices/groupsSlice';
import type { Group } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey = 'university' | 'dsa' | 'jee';

interface GroupGridProps {
  title: string;
  subtitle?: string;
  /** Which Redux-managed group list to display */
  sectionKey: SectionKey;
}

// ─── Selector map ─────────────────────────────────────────────────────────────

const INITIAL_DESKTOP_CARDS = 3;
const INITIAL_MOBILE_CARDS = 2;

// ─── Component ────────────────────────────────────────────────────────────────

const GroupGrid: React.FC<GroupGridProps> = ({ title, subtitle, sectionKey }) => {
  const dispatch = useAppDispatch();

  // Pick the right filtered selector based on sectionKey
  const universityGroups = useAppSelector(selectFilteredUniversityGroups);
  const dsaGroups = useAppSelector(selectFilteredDsaGroups);
  const jeeGroups = useAppSelector(selectFilteredJeeGroups);

  const groupMap: Record<SectionKey, Group[]> = {
    university: universityGroups,
    dsa: dsaGroups,
    jee: jeeGroups,
  };
  const groups = groupMap[sectionKey];

  const expandedSections = useAppSelector(selectExpandedSections);
  const showAll = expandedSections[sectionKey];

  const displayedGroups = showAll ? groups : groups.slice(0, INITIAL_DESKTOP_CARDS);
  const hasMoreGroups = groups.length > INITIAL_DESKTOP_CARDS;

  const handleToggle = () => dispatch(toggleSectionExpanded(sectionKey));

  return (
    <section>
      {/* Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4a3728] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#6b5847]/80">{subtitle}</p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {displayedGroups && displayedGroups.length > 0 ? (
          displayedGroups.map((g, index) => (
            <div
              key={g.id}
              className={
                !showAll && index >= INITIAL_MOBILE_CARDS ? 'hidden lg:block' : ''
              }
            >
              <GroupCard group={g} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No groups found.</p>
          </div>
        )}
      </div>

      {/* Show More / Show Less */}
      {hasMoreGroups && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleToggle}
            className="px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/20"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>Show More <ChevronDown size={18} /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default GroupGrid;