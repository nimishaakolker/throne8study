"use client";

import React from "react";
import GoalCard from "./GoalCard";

interface Goal {
  id: number;
  title: string;
  color: string;
  labels?: Array<{ name: string }>;
  progress?: boolean[];
  days?: string[];
}

interface GoalBoardProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: number) => void;
  onToggleWeek?: (goalId: number, weekIndex: number) => void;
}

const GoalBoard: React.FC<GoalBoardProps> = ({ 
  goals, 
  setGoals, 
  onEdit, 
  onDelete, 
  onToggleWeek 
}) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    e.dataTransfer.setData("index", index.toString());
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number): void => {
    const dragIndex = parseInt(e.dataTransfer.getData("index"));
    if (dragIndex === dropIndex) return;

    const updated = [...goals];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, moved);

    setGoals(updated);
  };

  return (
    <div className="grid md:grid-cols-2 mt-10 lg:grid-cols-3 gap-4">
      {goals.map((goal, index) => (
        <div
          key={goal.id}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, index)}
        >
          <GoalCard
            goal={goal}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleWeek={onToggleWeek}
          />
        </div>
      ))}
    </div>
  );
};

export default GoalBoard;