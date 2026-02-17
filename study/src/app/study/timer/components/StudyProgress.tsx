'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import { selectTotalStudyTime, selectSubjectBreakdown } from '@/lib/redux/selectors';

export default function StudyProgress() {
  const totalStudyTime = useAppSelector(selectTotalStudyTime);
  const studySessions = useAppSelector(selectSubjectBreakdown);

  return (
    <div className="w-full lg:w-80">
      <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#e0d8cf]/50 lg:sticky lg:top-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-black text-[#4a3728]">Today&apos;s Progress</h2>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4a3728]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Total Study Time Today */}
        <div className="bg-linear-to-r from-[#e0d8cf]/40 to-[#e0d8cf]/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#e0d8cf]/50">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#4a3728] mb-1">
              {totalStudyTime} min
            </div>
            <div className="text-xs font-bold text-[#4a3728]/60 uppercase tracking-wider">
              Total Study Time
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm font-bold text-[#4a3728] uppercase tracking-wider mb-2 sm:mb-3">
            Subject Breakdown
          </h3>
          {studySessions.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-[#4a3728]/40 text-xs sm:text-sm font-semibold">
              No study sessions yet. Start a timer!
            </div>
          ) : (
            studySessions.map((session, index) => (
              <div
                key={index}
                className="bg-linear-to-r from-[#e0d8cf]/40 to-[#e0d8cf]/20 rounded-lg p-2.5 sm:p-3 border border-[#e0d8cf]/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-[#4a3728] to-[#6b4e3d] rounded-lg flex items-center justify-center text-[#f6ede8] font-black text-[10px] sm:text-xs">
                    {session.subject.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#4a3728]">
                      {session.subject}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#4a3728]/60 font-semibold">
                      {session.time} minutes
                    </div>
                  </div>
                </div>
                <div className="text-base sm:text-lg font-black text-[#4a3728]">
                  {session.time}m
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}