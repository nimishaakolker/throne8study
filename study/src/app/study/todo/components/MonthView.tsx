'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { useCallback } from 'react';
import { Award } from 'lucide-react';

interface MonthViewProps {
  currentDate: Date;
  onDateClick: (day: number) => void;
}

export default function MonthView({ currentDate, onDateClick }: MonthViewProps) {
  const todos = useAppSelector(state => state.todos.items);

  const formatDate = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return {
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      startingDayOfWeek: new Date(year, month, 1).getDay(),
    };
  };

  const getTodoStats = (dateStr: string) => {
    const dateTodos = todos[dateStr] || [];
    return {
      total: dateTodos.length,
      completed: dateTodos.filter(t => t.completed).length,
    };
  };

  const isDateComplete = (dateStr: string): boolean => {
    const dateTodos = todos[dateStr] || [];
    return dateTodos.length > 0 && dateTodos.every(t => t.completed);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysMobile = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days: JSX.Element[] = [];

  // Empty cells
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="p-1 sm:p-2"></div>);
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = formatDate(date);
    const stats = getTodoStats(dateStr);
    const isComplete = isDateComplete(dateStr);
    const isToday = new Date().toDateString() === date.toDateString();

    days.push(
      <div
        key={day}
        onClick={() => onDateClick(day)}
        className={`relative p-1.5 sm:p-2 min-h-16 sm:min-h-20 md:min-h-24 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
          isToday
            ? 'border-[#8b7355] bg-[#f6ede8]'
            : 'border-[#e0d8cf] hover:border-[#8b7355]'
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-[#8b7355]' : 'text-[#4a3728]'}`}>
            {day}
          </span>
          {isComplete && (
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" />
          )}
        </div>
        {stats.total > 0 && (
          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-[10px] sm:text-xs text-[#6b5847]">
              {stats.completed}/{stats.total}
            </div>
            <div className="w-full bg-[#e0d8cf] rounded-full h-1 sm:h-1.5">
              <div
                className="bg-[#8b7355] h-1 sm:h-1.5 rounded-full transition-all"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Headers */}
        {weekDays.map((day, index) => (
          <div key={day} className="text-center font-bold text-[#4a3728] py-1.5 sm:py-2 text-xs sm:text-sm">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{weekDaysMobile[index]}</span>
          </div>
        ))}
        {days}
      </div>
    </div>
  );
}