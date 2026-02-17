'use client';

import React from 'react';
import GoalsHeader from './components/GoalsHeader';
import WeeklyTracker from './components/WeeklyTracker';

const Goals: React.FC = () => {
  return (
    <div>
      <GoalsHeader />
      <WeeklyTracker />
    </div>
  );
};

export default Goals;