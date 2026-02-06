"use client";

import React, { useState } from 'react';
import GoalsHeader from './components/GoalsHeader';
import WeeklyTracker from './components/WeeklyTracker';

interface Label {
  name: string;
}

interface Goal {
  id: number;
  title: string;
  color: string;
  labels?: Label[];
  progress?: boolean[];
  days?: string[];
}

const Goals: React.FC = () => {
  const [lastCreatedGoal, setLastCreatedGoal] = useState<Goal | null>(null);

  const handleGoalCreated = (goal: Goal): void => {
    console.log('Goals.tsx received goal:', goal); // Debug log
    setLastCreatedGoal(goal);
  };

  return (
    <div>
      <GoalsHeader onGoalCreated={handleGoalCreated} />
      
      <WeeklyTracker 
        newGoal={lastCreatedGoal}
      />
    </div>
  );
};

export default Goals;