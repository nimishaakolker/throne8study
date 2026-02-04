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
    <div className="">
      <GroupHeader />
 <TopRankedGroups/>
      <GroupGrid
        title="University Groups"
        subtitle="Find Friends from your College"
        groups={universityGroups as Group[]} // Ensure typing
      />

      <PublicStudyGroups />

      <GroupGrid
        title="Placement Groups"
        subtitle="Gear your placement preparation with like minded people"
        groups={DSAGroups as Group[]}
      />

<CTA />
      <GroupGrid
        title="JEE Study Groups"
        subtitle="Join forces with peers to conquer JEE together"
        groups={JEEGroups as Group[]}
      />
    </div>
  );
};

export default Groups;
