"use client";

import React, { useState } from 'react';
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
    <div className="relative w-24 h-24">
      <svg className="transform -rotate-90" width="96" height="96">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

interface Goal {
  id: number;
  title: string;
  color: string;
  labels?: { name: string }[];
  progress?: boolean[];
  days?: string[];
}

interface GoalHeaderProps {
  progress?: number;
  totalGoals?: number;
  completedGoals?: number;
  onGoalCreated?: (goal: Goal) => void;
}

const GoalHeader: React.FC<GoalHeaderProps> = ({ 
  progress = 0, 
  totalGoals = 0, 
  completedGoals = 0, 
  onGoalCreated 
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  const openCreateModal = (): void => setIsCreateModalOpen(true);
  const closeCreateModal = (): void => setIsCreateModalOpen(false);

  const openEditModal = (goal: Goal): void => {
    setEditingGoal(goal);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setEditingGoal(null);
  };

  const addGoal = (goal: Omit<Goal, 'id'>): void => {
    const newGoal: Goal = {
      id: Date.now(),
      ...goal,
    };
    
    setGoals((prev) => [...prev, newGoal]);
    
    // Send the new goal to parent component so WeeklyTracker can receive it
    if (onGoalCreated) {
      onGoalCreated(newGoal);
    }
    
    closeCreateModal();
  };

  const updateGoal = (updatedGoal: Goal): void => {
    setGoals((prev) =>
      prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
    );
    closeEditModal();
  };

  const deleteGoal = (id: number): void => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const toggleWeek = (goalId: number, weekIndex: number): void => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const newProgress = [...(g.progress || [])];
          newProgress[weekIndex] = !newProgress[weekIndex];
          return { ...g, progress: newProgress };
        }
        return g;
      })
    );
  };

  return (
    <section className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="mb-6 mt-10">
        <div className="text-center mb-8">
          <h2 className="text-5xl mb-4 font-extrabold text-[#4a3728]">
            Your Weekly Routine
          </h2>
          <p className="text-lg font-serif text-[#6b5847]">
            Monitor your goals and stay consistent every week
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          {/* Left Side: Create Goal */}
          <div className="text-center md:text-left">
            <p className="text-sm text-[#6b5847] mb-3">
              Add up to 5 goals and track them weekly 🌱
            </p>
            <p className="text-xs font-bold text-[#4a3728] mb-4 italic">
              💡 Drag goal cards to the weekly grid below to schedule them
            </p>
 
            <button
              className="bg-gradient-to-r from-[#4a3728] to-[#8b7355] hover:from-[#6b4e3d] hover:to-[#4a3728] text-[#f6ede8] px-8 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={openCreateModal}
            >
              + Create Goal
            </button>
          </div>

          {/* Right Side: Progress + Premium */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <CircularProgress progress={progress} color="#4a3728" />

              <div>
                <h3 className="font-semibold text-[#4a3728]">
                  Progress This Week
                </h3>
                <p className="text-sm text-[#6b5847]">
                  {totalGoals === 0 
                    ? "Add goals to track your progress"
                    : `${completedGoals} of ${totalGoals} goals completed`
                  }
                </p>
              </div>
            </div>

            {/* Premium Button */}
            <button
              className="bg-gradient-to-r items-center from-[#4a3728] to-[#8b7355] hover:from-[#6b4e3d] hover:to-[#4a3728] text-[#f6ede8] px-6 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ✨ Unlock Premium
            </button>
          </div>
        </div>
      </div>

      <GoalBoard
        goals={goals}
        setGoals={setGoals}
        onEdit={openEditModal}
        onDelete={deleteGoal}
        onToggleWeek={toggleWeek}
      />

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateGoalModal onClose={closeCreateModal} onSave={addGoal} />
      )}
      
      {isEditModalOpen && editingGoal && (
        <EditGoalModal 
          goal={editingGoal}
          onClose={closeEditModal} 
          onSave={updateGoal} 
        />
      )}
    </section>
  );
};

export default GoalHeader;