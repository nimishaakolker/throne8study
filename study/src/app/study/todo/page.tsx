"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  Trash2,
  Calendar,
  Award,
} from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface Todos {
  [dateStr: string]: Todo[];
}

interface TodoStats {
  total: number;
  completed: number;
}

// Separate TodoModal component
interface TodoModalProps {
  showTodoModal: boolean;
  selectedDate: Date | null;
  todos: Todos;
  formatDate: (date: Date) => string;
  isDateComplete: (dateStr: string) => boolean;
  setShowTodoModal: (show: boolean) => void;
  addTodo: () => void;
  toggleTodo: (dateStr: string, todoId: number) => void;
  deleteTodo: (dateStr: string, todoId: number) => void;
  newTodo: string;
  setNewTodo: (value: string) => void;
}

function TodoModal({
  showTodoModal,
  selectedDate,
  todos,
  formatDate,
  isDateComplete,
  setShowTodoModal,
  addTodo,
  toggleTodo,
  deleteTodo,
  newTodo,
  setNewTodo,
}: TodoModalProps) {
  if (!showTodoModal || !selectedDate) return null;

  const dateStr = formatDate(selectedDate);
  const dateTodos = todos[dateStr] || [];
  const isComplete = isDateComplete(dateStr);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center mt-5 z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex justify-between items-start sm:items-center rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-start sm:items-center gap-2 flex-1 pr-2">
            <Calendar className="text-[#8b7355] flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-[#4a3728] leading-tight">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              {isComplete && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-yellow-600 mt-1">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
                  <span className="font-semibold">All tasks completed!</span>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={() => setShowTodoModal(false)} 
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm"
            />
            <button
              onClick={addTodo}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 sm:gap-2"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden xs:inline">Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {dateTodos.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-[#6b5847]">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No tasks for this day</p>
              </div>
            ) : (
              dateTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border-2 transition-all ${
                    todo.completed
                      ? 'bg-[#f6ede8] border-[#8b7355]'
                      : 'bg-white border-[#e0d8cf] hover:border-[#8b7355]'
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(dateStr, todo.id)}
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      todo.completed
                        ? 'bg-[#8b7355] border-[#8b7355]'
                        : 'border-[#8b7355] hover:bg-[#8b7355]/10'
                    }`}
                  >
                    {todo.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </button>
                  <span
                    className={`flex-1 text-xs sm:text-sm break-words ${
                      todo.completed
                        ? 'line-through text-[#6b5847]'
                        : 'text-[#4a3728] font-medium'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(dateStr, todo.id)}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {dateTodos.length > 0 && (
            <div className="bg-[#f6ede8] rounded-lg p-3 text-sm text-[#4a3728]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs sm:text-sm">Progress</span>
                <span className="font-bold text-xs sm:text-sm">
                  {dateTodos.filter(t => t.completed).length}/{dateTodos.length}
                </span>
              </div>
              <div className="w-full bg-[#e0d8cf] rounded-full h-2">
                <div
                  className="bg-[#8b7355] h-2 rounded-full transition-all"
                  style={{
                    width: `${(dateTodos.filter(t => t.completed).length / dateTodos.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CalendarTodo() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTodoModal, setShowTodoModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todos>({});
  const [newTodo, setNewTodo] = useState<string>('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = useCallback((date: Date): { daysInMonth: number; startingDayOfWeek: number } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  }, []);

  const formatDate = useCallback((date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  const changeMonth = useCallback((increment: number): void => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + increment, 1));
  }, []);

  const isDateComplete = useCallback((dateStr: string): boolean => {
    const dateTodos = todos[dateStr] || [];
    return dateTodos.length > 0 && dateTodos.every(todo => todo.completed);
  }, [todos]);

  const getTodoStats = useCallback((dateStr: string): TodoStats => {
    const dateTodos = todos[dateStr] || [];
    const completed = dateTodos.filter(todo => todo.completed).length;
    return { total: dateTodos.length, completed };
  }, [todos]);

  const handleDateClick = useCallback((day: number): void => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowTodoModal(true);
  }, [currentDate]);

  const addTodo = useCallback((): void => {
    if (!newTodo.trim() || !selectedDate) return;

    const dateStr = formatDate(selectedDate);
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newTodoItem]
    }));

    setNewTodo('');
  }, [newTodo, selectedDate, formatDate]);

  const toggleTodo = useCallback((dateStr: string, todoId: number): void => {
    setTodos(prev => ({
      ...prev,
      [dateStr]: prev[dateStr].map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }, []);

  const deleteTodo = useCallback((dateStr: string, todoId: number): void => {
    setTodos(prev => ({
      ...prev,
      [dateStr]: prev[dateStr].filter(todo => todo.id !== todoId)
    }));
  }, []);

  const renderMonthView = useMemo(() => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days: JSX.Element[] = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekDaysMobile = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Week day headers - responsive
    const headers = weekDays.map((day, index) => (
      <div key={day} className="text-center font-bold text-[#4a3728] py-1.5 sm:py-2 text-xs sm:text-sm">
        <span className="hidden xs:inline">{day}</span>
        <span className="xs:hidden">{weekDaysMobile[index]}</span>
      </div>
    ));

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-1 sm:p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const stats = getTodoStats(dateStr);
      const isComplete = isDateComplete(dateStr);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`relative p-1.5 sm:p-2 min-h-16 sm:min-h-20 md:min-h-24 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
            isToday ? 'border-[#8b7355] bg-[#f6ede8]' : 'border-[#e0d8cf] hover:border-[#8b7355]'
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
          {headers}
          {days}
        </div>
      </div>
    );
  }, [currentDate, getDaysInMonth, formatDate, getTodoStats, isDateComplete, handleDateClick]);

  const renderYearView = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const registrationYear = 2019;
    const years: number[] = [];
    
    for (let year = registrationYear; year <= currentYear; year++) {
      years.push(year);
    }

    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4">
        {years.map((year) => {
          let completedDays = 0;
          let totalTaskDays = 0;
          
          // Count completed days for the entire year
          for (let month = 0; month < 12; month++) {
            const monthDate = new Date(year, month, 1);
            const { daysInMonth } = getDaysInMonth(monthDate);
            
            for (let day = 1; day <= daysInMonth; day++) {
              const dateStr = formatDate(new Date(year, month, day));
              const stats = getTodoStats(dateStr);
              if (stats.total > 0) {
                totalTaskDays++;
                if (isDateComplete(dateStr)) {
                  completedDays++;
                }
              }
            }
          }

          return (
            <div
              key={year}
              onClick={() => {
                setCurrentDate(new Date(year, 0, 1));
                setView('month');
              }}
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
                      style={{ width: `${totalTaskDays > 0 ? (completedDays / totalTaskDays) * 100 : 0}%` }}
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
  }, [getDaysInMonth, formatDate, getTodoStats, isDateComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4a3728]">Calendar & Todos</h1>
            <p className="text-sm sm:text-base text-[#6b5847] mt-1">
              {view === 'month'
                ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : 'All Years'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Toggle */}
            <div className="flex gap-1 sm:gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setView('month')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  view === 'month'
                    ? 'bg-[#8b7355] text-white'
                    : 'text-[#4a3728] hover:bg-[#f6ede8]'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('year')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  view === 'year'
                    ? 'bg-[#8b7355] text-white'
                    : 'text-[#4a3728] hover:bg-[#f6ede8]'
                }`}
              >
                Years
              </button>
            </div>

            {/* Navigation */}
            {view === 'month' && (
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1.5 sm:p-2 bg-white text-[#4a3728] rounded-lg hover:bg-[#8b7355] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#4a3728] rounded-lg hover:bg-[#8b7355] hover:text-white transition-all shadow-sm font-semibold text-xs sm:text-sm"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1.5 sm:p-2 bg-white text-[#4a3728] rounded-lg hover:bg-[#8b7355] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Calendar Views */}
        {view === 'month' ? renderMonthView : renderYearView}

        {/* Todo Modal */}
        <TodoModal
          showTodoModal={showTodoModal}
          selectedDate={selectedDate}
          todos={todos}
          formatDate={formatDate}
          isDateComplete={isDateComplete}
          setShowTodoModal={setShowTodoModal}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />
      </div>
    </div>
  );
}