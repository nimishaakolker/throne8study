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
      className="group relative rounded-2xl p-4 border transition-all hover:shadow-md cursor-pointer"
      style={{
        borderColor: goal.color,
        backgroundColor: `${goal.color}14`,
      }}
    >
      {/* Top Row */}
      <div className="flex items-start gap-3">
        {/* Color Dot */}
        <div className="w-3 h-3 mt-1 rounded-full" style={{ backgroundColor: goal.color }} />

        {/* Title + Labels */}
        <div className="flex-1">
          <h3 className="font-semibold text-[#3b2a1e]">{goal.title}</h3>

          {/* Labels */}
          <div className="flex flex-wrap gap-2 mt-2">
            {goal.labels?.map((label, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${goal.color}22`,
                  border: `1px solid ${goal.color}55`,
                  color: "#3b2a1e",
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <GripVertical size={18} className="text-[#3b2a1e]/40 cursor-grab mt-1 z-10" />
      </div>

      {/* Weekly Progress Circles */}
      <div className="flex gap-2 mt-4">
        {weeks.map((week, index) => (
          <button
            key={index}
            onClick={() => onToggleWeek?.(goal.id, index)}
            className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center"
            style={{
              backgroundColor: goal.progress?.[index] ? goal.color : "transparent",
              borderColor: goal.color,
            }}
          >
            <span 
              className="text-[10px] font-bold"
              style={{
                color: goal.progress?.[index] ? "white" : goal.color,
              }}
            >
              {week}
            </span>
          </button>
        ))}
      </div>

      {/* Hover Actions */}
      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 pointer-events-auto z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(goal);
          }}
          className="p-2 rounded-lg bg-white shadow hover:bg-[#f5f0ea]"
        >
          <Pencil size={14} className="text-[#4a3728]" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(goal.id);
          }}
          className="p-2 rounded-lg bg-white shadow hover:bg-red-100"
        >
          <Trash2 size={14} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default GoalCard;