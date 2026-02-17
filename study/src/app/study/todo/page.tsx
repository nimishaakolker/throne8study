'use client';

import { useState, useCallback } from 'react';
import CalendarHeader from './components/CalendarHeader';
import MonthView from './components/MonthView';
import YearView from './components/YearView';
import TodoModal from './components/TodoModal'

export default function CalendarTodo() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTodoModal, setShowTodoModal] = useState<boolean>(false);

  const formatDate = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  const changeMonth = useCallback((increment: number): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + increment, 1));
  }, []);

  const handleDateClick = useCallback((day: number): void => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowTodoModal(true);
  }, [currentDate]);

  const handleYearClick = useCallback((year: number): void => {
    setCurrentDate(new Date(year, 0, 1));
    setView('month');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <CalendarHeader
          currentDate={currentDate}
          view={view}
          setView={setView}
          changeMonth={changeMonth}
          setCurrentDate={setCurrentDate}
        />

        {view === 'month' ? (
          <MonthView
            currentDate={currentDate}
            onDateClick={handleDateClick}
          />
        ) : (
          <YearView
            onYearClick={handleYearClick}
          />
        )}

        <TodoModal
          selectedDate={selectedDate}
          showTodoModal={showTodoModal}
          setShowTodoModal={setShowTodoModal}
          formatDate={formatDate}
        />

      </div>
    </div>
  );
}