"use client";

import React from "react";
import { Pencil, Trash2, GripVertical } from "lucide-react";

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

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: number) => void;
  onToggleWeek?: (goalId: number, weekIndex: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, onToggleWeek }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.dataTransfer.setData('goal', JSON.stringify(goal));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const weeks = ['W1', 'W2', 'W3', 'W4'];

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group relative rounded-xl md:rounded-2xl p-3 md:p-4 border transition-all hover:shadow-md cursor-grab active:cursor-grabbing"
      style={{
        borderColor: goal.color,
        backgroundColor: `${goal.color}14`,
      }}
    >
      {/* Top Row */}
      <div className="flex items-start gap-2 md:gap-3">
        {/* Color Dot */}
        <div 
          className="w-2.5 h-2.5 md:w-3 md:h-3 mt-1 rounded-full flex-shrink-0" 
          style={{ backgroundColor: goal.color }} 
        />

        {/* Title + Labels */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm md:text-base text-[#3b2a1e] line-clamp-2 break-words">
            {goal.title}
          </h3>

          {/* Labels - Show max 2 on mobile, all on desktop */}
          {goal.labels && goal.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-2 mt-1.5 md:mt-2">
              {goal.labels.slice(0, 2).map((label, idx) => (
                <span
                  key={idx}
                  className="px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${goal.color}22`,
                    border: `1px solid ${goal.color}55`,
                    color: "#3b2a1e",
                  }}
                >
                  {label.name}
                </span>
              ))}
              {goal.labels.length > 2 && (
                <span
                  className="px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${goal.color}22`,
                    border: `1px solid ${goal.color}55`,
                    color: "#3b2a1e",
                  }}
                >
                  +{goal.labels.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Days - Mobile only */}
          {goal.days && goal.days.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5 md:hidden">
              {goal.days.slice(0, 3).map((day, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded text-xs bg-white/50 text-[#6b5847]"
                >
                  {day.slice(0, 3)}
                </span>
              ))}
              {goal.days.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-xs bg-white/50 text-[#6b5847]">
                  +{goal.days.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <GripVertical 
          size={16} 
          className="text-[#3b2a1e]/40 cursor-grab mt-0.5 md:mt-1 flex-shrink-0 md:opacity-50 md:group-hover:opacity-100 transition-opacity" 
        />
      </div>

      {/* Weekly Progress Circles */}
      <div className="flex gap-1.5 md:gap-2 mt-3 md:mt-4">
        {weeks.map((week, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWeek?.(goal.id, index);
            }}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            style={{
              backgroundColor: goal.progress?.[index] ? goal.color : "transparent",
              borderColor: goal.color,
            }}
            aria-label={`Week ${index + 1} - ${goal.progress?.[index] ? 'Completed' : 'Not completed'}`}
          >
            <span 
              className="text-xs md:text-[10px] font-bold"
              style={{
                color: goal.progress?.[index] ? "white" : goal.color,
              }}
            >
              {week}
            </span>
          </button>
        ))}
      </div>

      {/* Action Buttons - Always visible on mobile, hover on desktop */}
      <div className="flex gap-2 mt-3 md:mt-0 md:absolute md:bottom-2 md:right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(goal);
          }}
          className="flex-1 md:flex-none p-2 rounded-lg bg-white shadow hover:bg-[#f5f0ea] transition-colors flex items-center justify-center gap-1.5"
          aria-label="Edit goal"
        >
          <Pencil size={14} className="text-[#4a3728]" />
          <span className="text-xs font-medium text-[#4a3728] md:hidden">Edit</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(goal.id);
          }}
          className="flex-1 md:flex-none p-2 rounded-lg bg-white shadow hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
          aria-label="Delete goal"
        >
          <Trash2 size={14} className="text-red-500" />
          <span className="text-xs font-medium text-red-500 md:hidden">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default GoalCard;