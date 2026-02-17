'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleTimer, resetTimer } from '@/lib/redux/features/timer/timerSlice';
import { useRouter } from 'next/navigation';

export default function TimerControls() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isActive = useAppSelector(state => state.timer.isActive);

  const handleStart = () => {
    dispatch(toggleTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const handleTodoRedirect = () => {
    router.push('/study/todo');
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 relative">
      {/* Todo Button */}
      <button 
        onClick={handleTodoRedirect}
        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#e0d8cf]/60 hover:bg-[#e0d8cf]/80 text-[#4a3728] rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <span className="hidden lg:inline">Todo</span>
      </button>

      {/* Start/Pause Button */}
      <button
        onClick={handleStart}
        className="px-5 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-[#4a3728] to-[#6b4e3d] hover:from-[#6b4e3d] hover:to-[#8b6f47] text-[#f6ede8] rounded-lg font-black text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
      >
        {isActive ? (
          <>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Start
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#e0d8cf]/60 hover:bg-[#e0d8cf]/80 text-[#4a3728] rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span className="hidden lg:inline">Reset</span>
      </button>
    </div>
  );
}