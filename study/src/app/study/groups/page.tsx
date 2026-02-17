"use client";

import React, { useEffect } from 'react';
import type { Group } from './types';
import GroupHeader from './components/GroupHeader';
import GroupGrid from './components/GroupGrid';
import PublicStudyGroups from './components/PublicGroups';
import { universityGroups, DSAGroups, JEEGroups } from './data';
import TopRankedGroups from './components/TopRankedGroups';
import CTA from './components/CTA';

import { useAppDispatch } from '../../hooks'; // your existing hooks file

import { seedGroups } from '../../features/groups/groupsSlice';

// Tag each group with its section so the slice can filter by it
const allItems = [
  ...universityGroups.map((g) => ({ ...g, section: 'university' as const })),
  ...(DSAGroups as Group[]).map((g) => ({ ...g, section: 'dsa' as const })),
  ...(JEEGroups as Group[]).map((g) => ({ ...g, section: 'jee' as const })),
];

const publicGroupsData = [
  { id: 101, title: 'Delhi University Placement Prep',  members: 214 },
  { id: 102, title: 'Mumbai Web Development Circle',    members: 168 },
  { id: 103, title: 'Chennai Aptitude Masters',          members: 142 },
  { id: 104, title: 'Pune Core CS Study Group',          members: 196 },
  { id: 105, title: 'Bangalore Interview Practice Hub',  members: 233 },
  { id: 106, title: 'Hyderabad DSA Daily Practice',      members: 187 },
];

const Groups: React.FC = () => {
  const dispatch = useAppDispatch();

  // Seeds data once. On refresh, localStorage data takes over — this becomes a no-op.
  useEffect(() => {
    dispatch(seedGroups({ items: allItems as any, publicGroups: publicGroupsData }));
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f6ede8] via-[#ede4db] to-[#e0d8cf] overflow-x-hidden">
      <div className="w-full max-w-[1920px] mx-auto">

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <GroupHeader />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 lg:py-10">
          <TopRankedGroups />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <GroupGrid
            title="University Groups"
            subtitle="Find Friends from your College"
            sectionKey="university"
          />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <PublicStudyGroups />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <GroupGrid
            title="Placement Groups"
            subtitle="Gear your placement preparation with like minded people"
            sectionKey="dsa"
          />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 lg:py-10">
          <CTA />
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 pb-6 sm:pb-12 md:pb-16 lg:pb-20">
          <GroupGrid
            title="JEE Study Groups"
            subtitle="Join forces with peers to conquer JEE together"
            sectionKey="jee"
          />
        </div>

      </div>
    </div>
  );
};

export default Groups;