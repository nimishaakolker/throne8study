'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addGoal, updateGoal, deleteGoal, toggleWeekProgress, Goal } from '@/lib/redux/features/goals/goalsSlice';
import CreateGoalModal from "./CreateGoalModal";
import EditGoalModal from "./EditGoalModal";
import GoalBoard from "./GoalBoard";

interface CircularProgressProps {
  progress: number;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, color }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      <svg className="transform -rotate-90 w-full h-full">
        <circle cx="50%" cy="50%" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx="50%" cy="50%" r={radius}
          stroke={color} strokeWidth="8" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base md:text-lg font-bold" style={{ color }}>{progress}%</span>
      </div>
    </div>
  );
};

const GoalHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const goals = useAppSelector(state => state.goals.items);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Calculate progress
  const totalWeeks = goals.reduce((acc, g) => acc + (g.progress?.length || 0), 0);
  const completedWeeks = goals.reduce((acc, g) => acc + (g.progress?.filter(Boolean).length || 0), 0);
  const progress = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;
  const completedGoals = goals.filter(g => g.progress?.every(Boolean)).length;

  const handleAddGoal = (goalData: Omit<Goal, 'id'>) => {
    dispatch(addGoal(goalData));
    setIsCreateModalOpen(false);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    dispatch(updateGoal(updatedGoal));
    setIsEditModalOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: number) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      dispatch(deleteGoal(id));
    }
  };

  const handleToggleWeek = (goalId: number, weekIndex: number) => {
    dispatch(toggleWeekProgress({ goalId, weekIndex }));
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsEditModalOpen(true);
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-4 md:mb-6 mt-4 md:mt-10">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 font-extrabold text-[#4a3728]">
            Your Weekly Routine
          </h2>
          <p className="text-base md:text-lg font-serif text-[#6b5847] px-4">
            Monitor your goals and stay consistent every week
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Left Side */}
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-sm text-[#6b5847] mb-2 md:mb-3">
              Add up to 5 goals and track them weekly 🌱
            </p>
            <p className="text-xs font-bold text-[#4a3728] mb-3 md:mb-4 italic">
              💡 Drag goal cards to the weekly grid below to schedule them
            </p>
            <button
              className="w-full md:w-auto bg-gradient-to-r from-[#4a3728] to-[#8b7355] hover:from-[#6b4e3d] hover:to-[#4a3728] text-[#f6ede8] px-6 md:px-8 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              + Create Goal
            </button>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start">
              <CircularProgress progress={progress} color="#4a3728" />
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-[#4a3728] text-sm md:text-base">
                  Progress This Week
                </h3>
                <p className="text-xs md:text-sm text-[#6b5847]">
                  {goals.length === 0
                    ? "Add goals to track"
                    : `${completedGoals} of ${goals.length} completed`}
                </p>
              </div>
            </div>
            <button className="w-full md:w-auto bg-gradient-to-r from-[#4a3728] to-[#8b7355] hover:from-[#6b4e3d] hover:to-[#4a3728] text-[#f6ede8] px-6 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
              ✨ Unlock Premium
            </button>
          </div>
        </div>
      </div>

      <GoalBoard
        goals={goals}
        onEdit={openEditModal}
        onDelete={handleDeleteGoal}
        onToggleWeek={handleToggleWeek}
      />

      {isCreateModalOpen && (
        <CreateGoalModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleAddGoal}
        />
      )}

      {isEditModalOpen && editingGoal && (
        <EditGoalModal
          goal={editingGoal}
          onClose={() => { setIsEditModalOpen(false); setEditingGoal(null); }}
          onSave={handleUpdateGoal}
        />
      )}
    </section>
  );
};

export default GoalHeader;