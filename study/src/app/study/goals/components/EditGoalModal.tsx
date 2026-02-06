"use client";

import React, { useState, useEffect } from 'react';

interface Label {
  name: string;
}

interface Goal {
  id: number;
  title?: string;
  labels?: Label[];
  color?: string;
  days?: string[];
  progress?: boolean[];
}

interface EditGoalModalProps {
  goal: Goal;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

const EditGoalModal: React.FC<EditGoalModalProps> = ({ goal, onClose, onSave }) => {
  const [goalName, setGoalName] = useState<string>('');
  const [goalLabel, setGoalLabel] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Load existing goal data
  useEffect(() => {
    if (goal) {
      setGoalName(goal.title || '');
      setGoalLabel(goal.labels?.[0]?.name || '');
      setSelectedColor(goal.color || '#3b82f6');
      setSelectedDays(goal.days || []);
    }
  }, [goal]);

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Teal', value: '#14b8a6' },
  ];

  const days = [
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' },
    { short: 'S', full: 'Sunday' },
  ];

  const toggleDay = (dayFull: string): void => {
    setSelectedDays((prev) =>
      prev.includes(dayFull)
        ? prev.filter((d) => d !== dayFull)
        : [...prev, dayFull]
    );
  };

  const handleSave = (): void => {
    if (!goalName.trim()) {
      alert('Please enter a goal name');
      return;
    }
    if (selectedDays.length === 0) {
      alert('Please select at least one day');
      return;
    }

    const labels: Label[] = goalLabel.trim() ? [{ name: goalLabel.trim() }] : [];

    onSave({
      ...goal,
      title: goalName,
      labels: labels,
      color: selectedColor,
      days: selectedDays,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }}>
      <div className="bg-[#f6ede8] rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6b5847] hover:text-[#4a3728] text-2xl font-bold transition-colors"
        >
          ×
        </button>

        {/* Title with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${selectedColor}22` }}
          >
            <span className="text-xl">✏️</span>
          </div>
          <h2 className="text-2xl font-bold text-[#4a3728]">Edit Goal</h2>
        </div>

        {/* Goal Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#4a3728] mb-2">
            Goal Name
          </label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Morning Exercise"
            className="w-full px-4 py-3 border-2 border-[#d4c4b0] rounded-lg focus:outline-none focus:border-[#4a3728] bg-white text-[#4a3728] transition-colors"
          />
        </div>

        {/* Label Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#4a3728] mb-2">
            Label (Optional)
          </label>
          <input
            type="text"
            value={goalLabel}
            onChange={(e) => setGoalLabel(e.target.value)}
            placeholder="e.g., Health, Work, Personal"
            maxLength={15}
            className="w-full px-4 py-3 border-2 border-[#d4c4b0] rounded-lg focus:outline-none focus:border-[#4a3728] bg-white text-[#4a3728] transition-colors"
          />
          <p className="text-xs text-[#6b5847] mt-1 italic">
            Add a short tag to categorize your goal
          </p>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#4a3728] mb-3">
            Choose Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-10 h-10 rounded-full transition-all duration-200 ${
                  selectedColor === color.value
                    ? 'ring-4 ring-offset-2 ring-[#4a3728] scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Day Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#4a3728] mb-3">
            Select Days
          </label>
          <div className="flex gap-2 justify-between">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDay(day.full)}
                className={`w-11 h-11 rounded-full font-bold text-sm transition-all duration-200 ${
                  selectedDays.includes(day.full)
                    ? 'text-white shadow-lg scale-110'
                    : 'bg-white text-[#6b5847] border-2 border-[#d4c4b0] hover:border-[#4a3728]'
                }`}
                style={{
                  backgroundColor: selectedDays.includes(day.full) ? selectedColor : undefined,
                }}
                title={day.full}
              >
                {day.short}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#6b5847] mt-2 italic">
            {selectedDays.length === 0
              ? 'Select the days you want to do this goal'
              : `Selected: ${selectedDays.join(', ')}`}
          </p>
        </div>

        {/* Progress Info */}
        {goal?.progress && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800 flex items-start gap-2">
              <span className="text-lg">📊</span>
              <span>
                <strong>Current Progress:</strong> {goal.progress.filter(Boolean).length} of 4 weeks completed
              </span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-[#d4c4b0] text-[#4a3728] rounded-lg font-semibold hover:bg-[#d4c4b0] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4a3728] to-[#8b7355] text-[#f6ede8] rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>💾</span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalModal;