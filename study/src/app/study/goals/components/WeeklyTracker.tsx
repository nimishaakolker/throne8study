"use client";

import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  // Mobile: Track which day is currently shown
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(getTodayIndex());
  
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

  function getTodayIndex(): number {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Convert Sunday=0 to index 6
  }

  // Initialize to today's index
  useEffect(() => {
    setCurrentDayIndex(getTodayIndex());
  }, []);

  // Listen for new goals with pre-selected days
  useEffect(() => {
    console.log('WeeklyTracker received newGoal:', newGoal);
    
    if (newGoal && newGoal.days && newGoal.days.length > 0) {
      console.log('Adding goal to days:', newGoal.days);
      
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

  // Mobile navigation
  const goToPrevDay = () => {
    setCurrentDayIndex((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const goToNextDay = () => {
    setCurrentDayIndex((prev) => (prev === 6 ? 0 : prev + 1));
  };

  const renderDayColumn = (day: DayName, index: number) => {
    const isToday = index === getTodayIndex();
    
    return (
      <div key={day} className="flex flex-col h-full">
        {/* Day Header */}
        <div className={`text-center py-3 mb-2 ${isToday ? 'border-b-2 border-green-600' : ''}`}>
          <h3 className="text-[#4a3728] font-semibold text-sm md:text-base">
            {day}
          </h3>
          {isToday && (
            <span className="text-xs text-green-600 font-medium">Today</span>
          )}
        </div>
        
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, day)}
          className="flex-1 border border-gray-200 rounded-lg min-h-[300px] md:min-h-[400px] p-3 flex flex-col gap-2 transition-colors overflow-y-auto"
        >
          {weeklyGoals[day].length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[#6b5847] text-sm text-center">Drag goals here</p>
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
                    <h4 className="font-medium text-[#3b2a1e] text-sm break-words">
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

                {/* Remove Button (on hover for desktop, always visible on mobile) */}
                <button
                  onClick={() => removeGoal(day, goal.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-3 md:py-5 px-3 md:px-0">
      {/* MOBILE VIEW - Single Day with Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {/* Previous Day Button */}
          <button
            onClick={goToPrevDay}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft size={20} className="text-[#4a3728]" />
          </button>

          {/* Day Indicator */}
          <div className="text-center">
            <p className="text-xs text-[#6b5847] mb-1">
              {currentDayIndex + 1} of 7
            </p>
            <div className="flex gap-1">
              {days.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentDayIndex
                      ? 'bg-[#4a3728] w-6'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next Day Button */}
          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next day"
          >
            <ChevronRight size={20} className="text-[#4a3728]" />
          </button>
        </div>

        {/* Single Day Column */}
        <div className="h-[calc(100vh-280px)] overflow-hidden">
          {renderDayColumn(days[currentDayIndex], currentDayIndex)}
        </div>
      </div>

      {/* TABLET VIEW - 3 Days Scrollable */}
      <div className="hidden md:block lg:hidden">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-3 min-w-[700px]">
            {days.slice(0, 3).map((day, index) => renderDayColumn(day, index))}
          </div>
          <div className="grid grid-cols-3 gap-3 min-w-[700px] mt-4">
            {days.slice(3, 6).map((day, index) => renderDayColumn(day, index + 3))}
          </div>
          <div className="grid grid-cols-1 gap-3 mt-4 max-w-[230px]">
            {renderDayColumn(days[6], 6)}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW - All 7 Days */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="grid grid-cols-7 gap-3 xl:gap-4">
          {days.map((day, index) => renderDayColumn(day, index))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyTracker;