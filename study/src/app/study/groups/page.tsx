import React from 'react';
import type { Group } from './types';
import GroupHeader from './components/GroupHeader';
import GroupGrid from './components/GroupGrid';
import PublicStudyGroups from './components/PublicGroups';
import { universityGroups, DSAGroups, JEEGroups } from './data';
import TopRankedGroups from './components/TopRankedGroups';
import CTA from './components/CTA';

const Groups: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f6ede8] via-[#ede4db] to-[#e0d8cf] overflow-x-hidden">
      {/* Container with responsive padding - minimal on mobile */}
      <div className="w-full max-w-[1920px] mx-auto">
        {/* Header Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <GroupHeader />
        </div>

        {/* Top Ranked Groups Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 lg:py-10">
          <TopRankedGroups />
        </div>

        {/* University Groups Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <GroupGrid
            title="University Groups"
            subtitle="Find Friends from your College"
            groups={universityGroups as Group[]}
          />
        </div>

        {/* Public Study Groups Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <PublicStudyGroups />
        </div>

        {/* Placement Groups Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8">
          <GroupGrid
            title="Placement Groups"
            subtitle="Gear your placement preparation with like minded people"
            groups={DSAGroups as Group[]}
          />
        </div>

        {/* CTA Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 lg:py-10">
          <CTA />
        </div>

        {/* JEE Study Groups Section */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-6 md:py-8 pb-6 sm:pb-12 md:pb-16 lg:pb-20">
          <GroupGrid
            title="JEE Study Groups"
            subtitle="Join forces with peers to conquer JEE together"
            groups={JEEGroups as Group[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Groups;