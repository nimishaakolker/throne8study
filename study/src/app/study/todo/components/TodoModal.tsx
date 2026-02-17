'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addTodo, toggleTodo, deleteTodo } from '@/lib/redux/features/todo/todoSlice';
import { useState } from 'react';
import { Calendar, Award, X, Plus, Check, Trash2 } from 'lucide-react';

interface TodoModalProps {
  selectedDate: Date | null;
  showTodoModal: boolean;
  setShowTodoModal: (show: boolean) => void;
  formatDate: (date: Date) => string;
}

export default function TodoModal({
  selectedDate,
  showTodoModal,
  setShowTodoModal,
  formatDate,
}: TodoModalProps) {
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = useState('');

  // ✅ ALL hooks must be at top - BEFORE any early returns!
  const dateStr = selectedDate ? formatDate(selectedDate) : '';
  const dateTodos = useAppSelector(state => 
    dateStr ? state.todos.items[dateStr] || [] : []
  );
  const isComplete = dateTodos.length > 0 && dateTodos.every(t => t.completed);

  // ✅ Early return AFTER hooks
  if (!showTodoModal || !selectedDate) return null;

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    dispatch(addTodo({ dateStr, text: newTodo.trim() }));
    setNewTodo('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center mt-5 z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
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
            <X size={20} />
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          {/* Add Todo Input */}
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
              onClick={handleAdd}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Todo List */}
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
                    onClick={() => dispatch(toggleTodo({ dateStr, todoId: todo.id }))}
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
                    onClick={() => dispatch(deleteTodo({ dateStr, todoId: todo.id }))}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Progress Bar */}
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