'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { useCallback } from 'react';
import { Award } from 'lucide-react';

interface YearViewProps {
  onYearClick: (year: number) => void;
}

export default function YearView({ onYearClick }: YearViewProps) {
  const todos = useAppSelector(state => state.todos.items);

  const formatDate = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
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

  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = 2019; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4">
      {years.map((year) => {
        let completedDays = 0;
        let totalTaskDays = 0;

        for (let month = 0; month < 12; month++) {
          const daysInMonth = getDaysInMonth(new Date(year, month, 1));
          for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = formatDate(new Date(year, month, day));
            const stats = getTodoStats(dateStr);
            if (stats.total > 0) {
              totalTaskDays++;
              if (isDateComplete(dateStr)) completedDays++;
            }
          }
        }

        return (
          <div
            key={year}
            onClick={() => onYearClick(year)}
            className="border-2 border-[#e0d8cf] rounded-lg p-3 sm:p-4 cursor-pointer hover:border-[#8b7355] hover:shadow-md transition-all"
          >
            <div className="font-bold text-[#4a3728] mb-2 text-lg sm:text-xl">{year}</div>
            {totalTaskDays > 0 ? (
              <div className="space-y-2">
                <div className="text-xs text-[#6b5847]">
                  {completedDays}/{totalTaskDays} days complete
                </div>
                <div className="w-full bg-[#e0d8cf] rounded-full h-2">
                  <div
                    className="bg-[#8b7355] h-2 rounded-full transition-all"
                    style={{ width: `${(completedDays / totalTaskDays) * 100}%` }}
                  ></div>
                </div>
                {completedDays > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {Array(Math.min(completedDays, 15)).fill(0).map((_, i) => (
                      <Award key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" />
                    ))}
                    {completedDays > 15 && (
                      <span className="text-xs text-[#4a3728] font-bold">+{completedDays - 15}</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-[#6b5847] italic">No tasks this year</div>
            )}
          </div>
        );
      })}
    </div>
  );
}