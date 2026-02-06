"use client";

import React from 'react';

interface CircularProgressProps {
  progress?: number;
  radius?: number;
  color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  progress = 14, 
  radius = 28, 
  color = '#4a3728' 
}) => {
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r={normalizedRadius}
          stroke="#e5e5e5"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="32"
          cy="32"
          r={normalizedRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;