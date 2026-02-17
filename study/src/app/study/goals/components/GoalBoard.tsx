'use client';

import React from 'react';
import GoalCard from './GoalCard';
import { Goal } from '@/lib/redux/features/goals/goalsSlice';

interface GoalBoardProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: number) => void;
  onToggleWeek: (goalId: number, weekIndex: number) => void;
}

const GoalBoard: React.FC<GoalBoardProps> = ({ goals, onEdit, onDelete, onToggleWeek }) => {
  return (
    <div className="w-full">
      {goals.length === 0 ? (
        <div className="text-center py-8 md:py-12 px-4">
          <div className="max-w-md mx-auto">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#4a3728] mb-2">
              No goals yet
            </h3>
            <p className="text-sm md:text-base text-[#6b5847]">
              Create your first goal to get started on your weekly routine
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleWeek={onToggleWeek}
              />
            ))}
          </div>
          <div className="text-center text-xs md:text-sm text-[#6b5847] bg-[#f6ede8] rounded-lg p-3 md:p-4">
            <p className="font-medium">
              💡 <span className="hidden sm:inline">Tip:</span> Drag any goal card to the weekly schedule below
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalBoard;