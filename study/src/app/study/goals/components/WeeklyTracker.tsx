"use client";

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  color: string;
  days?: string[];
  completed?: boolean;
}

interface WeeklyGoals {
  Monday: Goal[];
  Tuesday: Goal[];
  Wednesday: Goal[];
  Thursday: Goal[];
  Friday: Goal[];
  Saturday: Goal[];
  Sunday: Goal[];
}

type DayName = keyof WeeklyGoals;

interface WeeklyTrackerProps {
  onGoalDrop?: (goal: Goal, day: string) => void;
  newGoal?: Goal | null;
}

const WeeklyTracker: React.FC<WeeklyTrackerProps> = ({ onGoalDrop, newGoal }) => {
  const days: DayName[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Store goals assigned to each day with completion status
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoals>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Listen for new goals with pre-selected days
  useEffect(() => {
    console.log('WeeklyTracker received newGoal:', newGoal); // Debug log
    
    if (newGoal && newGoal.days && newGoal.days.length > 0) {
      console.log('Adding goal to days:', newGoal.days); // Debug log
      
      setWeeklyGoals(prev => {
        const updated = { ...prev };
        
        // Add the goal to each selected day
        newGoal.days!.forEach(day => {
          const dayKey = day as DayName;
          // Check if goal already exists for this day
          const exists = updated[dayKey].some(g => g.id === newGoal.id);
          if (!exists) {
            updated[dayKey] = [...updated[dayKey], { ...newGoal, completed: false }];
          }
        });
        
        return updated;
      });
    }
  }, [newGoal]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-50');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove('bg-gray-50');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: DayName): void => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-50');
    
    try {
      const goalData: Goal = JSON.parse(e.dataTransfer.getData('goal'));
      
      // Check if goal already exists for this day
      const exists = weeklyGoals[day].some(g => g.id === goalData.id);
      if (exists) return;
      
      setWeeklyGoals(prev => ({
        ...prev,
        [day]: [...prev[day], { ...goalData, completed: false }]
      }));
      
      onGoalDrop?.(goalData, day);
    } catch (error) {
      console.error('Error dropping goal:', error);
    }
  };

  const toggleCompletion = (day: DayName, goalId: number): void => {
    setWeeklyGoals(prev => ({
      ...prev,
      [day]: prev[day].map(g => 
        g.id === goalId ? { ...g, completed: !g.completed } : g
      )
    }));
  };

  const removeGoal = (day: DayName, goalId: number): void => {
    setWeeklyGoals(prev => ({
      ...prev,
      [day]: prev[day].filter(g => g.id !== goalId)
    }));
  };

  const getTodayIndex = (): number => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Convert Sunday=0 to index 6
  };

  return (
    <div className="w-full py-5 max-w-7xl mx-auto">
      {/* Weekly Grid */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col">
            {/* Day Header */}
            <div className={`text-center py-3 mb-2 ${index === getTodayIndex() ? 'border-b-2 border-green-600' : ''}`}>
              <h3 className="text-[#4a3728] font-medium text-sm">{day}</h3>
            </div>
            
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, day)}
              className="flex-1 border border-gray-200 rounded-lg min-h-[400px] p-3 flex flex-col gap-2 transition-colors"
            >
              {weeklyGoals[day].length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[#6b5847] text-sm">Drag goals here</p>
                </div>
              ) : (
                weeklyGoals[day].map((goal) => (
                  <div
                    key={goal.id}
                    className="group relative rounded-lg p-3 border transition-all hover:shadow-sm"
                    style={{
                      borderColor: goal.color,
                      backgroundColor: `${goal.color}14`,
                    }}
                  >
                    {/* Goal Content */}
                    <div className="flex items-start gap-2">
                      {/* Color Dot */}
                      <div 
                        className="w-2 h-2 mt-1 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: goal.color }} 
                      />
                      
                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#3b2a1e] text-sm truncate">
                          {goal.title}
                        </h4>
                      </div>

                      {/* Checkbox */}
                      <button
                        onClick={() => toggleCompletion(day, goal.id)}
                        className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                        style={{
                          borderColor: goal.color,
                          backgroundColor: goal.completed ? goal.color : 'transparent',
                        }}
                      >
                        {goal.completed && (
                          <Check size={12} className="text-white" strokeWidth={3} />
                        )}
                      </button>
                    </div>

                    {/* Remove Button (on hover) */}
                    <button
                      onClick={() => removeGoal(day, goal.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTracker;