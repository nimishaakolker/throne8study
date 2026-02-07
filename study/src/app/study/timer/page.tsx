'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tab {
  id: string;
  name: string;
  duration: number | null;
}

interface StudySession {
  subject: string;
  time: number;
}

const PomodoroTimer: React.FC = () => {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<string>('pomodoro');
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [showCustomTimer, setShowCustomTimer] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<number>(15);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [isBreakMode, setIsBreakMode] = useState<boolean>(false);

  const tabs: Tab[] = [
    { id: 'pomodoro', name: 'Pomodoro', duration: 25 },
    { id: 'focus', name: 'Focus', duration: 45 },
    { id: 'timer', name: 'Timer', duration: null }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Session complete
            if (activeTab === 'pomodoro') {
              if (isBreakMode) {
                // Break is complete, switch back to study mode AUTOMATICALLY
                setIsBreakMode(false);
                setMinutes(25); // Back to 25 minute study (change to 25 for production)
                setSeconds(0);
                setIsActive(true); // AUTO-START the next study session
                setSessionStartTime(Date.now()); // Start tracking time
              } else {
                // Study session complete
                if (sessionStartTime) {
                  const studyDuration = Math.ceil((Date.now() - sessionStartTime) / 60000);
                  // Pass subject (or empty string which will become "Other")
                  addStudyTime(subject, studyDuration);
                }
                
                // Increment completed sessions
                const newCompletedSessions = completedSessions + 1;
                setCompletedSessions(newCompletedSessions);
                
                // Determine break duration and AUTO-START break
                if (newCompletedSessions % 4 === 0) {
                  // After 4 sessions, take a 2-minute long break
                  setMinutes(20);
                  setIsBreakMode(true);
                } else {
                  // Regular 1-minute short break
                  setMinutes(1);
                  setIsBreakMode(true);
                }
                
                setSeconds(0);
                setIsActive(true); // AUTO-START the break
                setSessionStartTime(null);
              }
            } else {
              // For non-pomodoro modes (Focus/Timer)
              if (sessionStartTime) {
                const studyDuration = Math.ceil((Date.now() - sessionStartTime) / 60000);
                addStudyTime(subject, studyDuration);
              }
              setCompletedSessions(prev => prev + 1);
              setIsActive(false);
              setSessionStartTime(null);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, subject, sessionStartTime, activeTab, isBreakMode, completedSessions]);

  const addStudyTime = (subjectName: string, duration: number): void => {
    // Use "Other" if no subject is provided
    const finalSubject = subjectName.trim() || "Other";
    
    setStudySessions(prev => {
      const existingIndex = prev.findIndex(s => s.subject === finalSubject);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          time: updated[existingIndex].time + duration
        };
        return updated;
      } else {
        return [...prev, { subject: finalSubject, time: duration }];
      }
    });
    setTotalStudyTime(prev => prev + duration);
  };

  const handleTabChange = (tab: Tab): void => {
    setActiveTab(tab.id);
    setIsBreakMode(false);
    if (tab.duration === null) {
      setShowCustomTimer(true);
      setMinutes(customMinutes);
    } else {
      setMinutes(tab.duration);
      setShowCustomTimer(false);
    }
    setSeconds(0);
    setIsActive(false);
    setSessionStartTime(null);
  };

  const handleCustomTimerChange = (increment: number): void => {
    const newValue = customMinutes + increment;
    if (newValue >= 1 && newValue <= 180) {
      setCustomMinutes(newValue);
      if (!isActive) {
        setMinutes(newValue);
        setSeconds(0);
      }
    }
  };

  const handleStart = (): void => {
    // Start tracking time when starting a session (not during break)
    if (!isActive && !isBreakMode) {
      setSessionStartTime(Date.now());
    }
    setIsActive(!isActive);
  };

  const handleReset = (): void => {
    if (isActive && sessionStartTime) {
      // Add partial study time if resetting during active session
      const studyDuration = Math.ceil((Date.now() - sessionStartTime) / 60000);
      if (studyDuration > 0) {
        addStudyTime(subject, studyDuration);
      }
    }
    setIsActive(false);
    const currentTab = tabs.find(t => t.id === activeTab);
    if (currentTab?.duration === null) {
      setMinutes(customMinutes);
    } else if (currentTab?.duration) {
      setMinutes(currentTab.duration);
    }
    setSeconds(0);
    setSessionStartTime(null);
  };

  const handleTodoRedirect = (): void => {
    router.push('/study/todo');
  };

  const currentTab = tabs.find(t => t.id === activeTab);
  const tabDuration = currentTab?.duration ?? customMinutes;
  const progress = ((tabDuration * 60 - (minutes * 60 + seconds)) / (tabDuration * 60)) * 100;

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center justify-start p-3 sm:p-4 lg:p-6 lg:justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
        {/* Left Side - Timer */}
        <div className="w-full lg:flex-1 lg:max-w-lg">
          {/* Tabs */}
          <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-lg border border-[#e0d8cf]/50 mb-3 sm:mb-4">
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab)}
                  className={`py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-linear-to-r from-[#4a3728] to-[#6b4e3d] text-[#f6ede8] shadow-md'
                      : 'bg-transparent text-[#4a3728] hover:bg-[#e0d8cf]/50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Timer Card */}
          <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#e0d8cf]/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-[#8b6f47]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-[#6b4e3d]/10 to-transparent rounded-full blur-2xl"></div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 relative">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    idx < Math.floor(progress / 12.5)
                      ? 'bg-linear-to-r from-[#4a3728] to-[#6b4e3d] shadow-sm'
                      : 'bg-[#e0d8cf]/50'
                  }`}
                ></div>
              ))}
            </div>

            {/* Timer Display */}
            <div className="text-center mb-4 sm:mb-6 relative">
              <div className="text-5xl sm:text-6xl md:text-7xl font-black text-[#4a3728] tracking-tight mb-1">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-xs font-bold text-[#4a3728]/60 uppercase tracking-wider">
                {isBreakMode ? (
                  completedSessions % 4 === 0 ? 'Long Break' : 'Short Break'
                ) : (
                  `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Session`
                )}
              </div>
            </div>

            {/* Custom Timer Options */}
            {activeTab === 'timer' && showCustomTimer && (
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs font-bold text-[#4a3728]/70 uppercase tracking-wider mb-2 sm:mb-3 text-center">
                  Set Duration (Minutes)
                </label>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <button
                    onClick={() => handleCustomTimerChange(-5)}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e0d8cf]/60 hover:bg-[#e0d8cf]/80 text-[#4a3728] rounded-lg font-bold transition-all duration-300 hover:scale-110 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"/>
                    </svg>
                  </button>
                  
                  <div className="bg-linear-to-r from-[#4a3728] to-[#6b4e3d] text-[#f6ede8] rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 min-w-20 sm:min-w-25 text-center">
                    <div className="text-2xl sm:text-3xl font-black">{customMinutes}</div>
                    <div className="text-xs font-bold opacity-80">minutes</div>
                  </div>

                  <button
                    onClick={() => handleCustomTimerChange(5)}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e0d8cf]/60 hover:bg-[#e0d8cf]/80 text-[#4a3728] rounded-lg font-bold transition-all duration-300 hover:scale-110 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Subject Input */}
            <div className="bg-linear-to-r from-[#e0d8cf]/60 to-[#e0d8cf]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#e0d8cf]/50 relative">
              <label className="block text-xs font-bold text-[#4a3728]/70 uppercase tracking-wider mb-1.5">
                {isBreakMode ? 'Break Time' : 'Subject'}
              </label>
              {isBreakMode ? (
                <div className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 text-center">
                  {completedSessions % 4 === 0 ? 'Take a long break! 🎉' : 'Take a short break! ☕'}
                </div>
              ) : (
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What are you working on?"
                  className="w-full bg-[#f6ede8] text-[#4a3728] text-sm font-semibold px-3 py-2 rounded-lg border border-[#e0d8cf]/50 focus:outline-none focus:ring-2 focus:ring-[#6b4e3d]/30 placeholder:text-[#4a3728]/30"
                  disabled={isActive}
                />
              )}
            </div>

            {/* Control Buttons */}
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
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">{completedSessions}</div>
              <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Sessions</div>
            </div>
            <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">{totalStudyTime}</div>
              <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Minutes</div>
            </div>
            <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#e0d8cf]/50 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#4a3728] mb-0.5">0</div>
              <div className="text-[10px] sm:text-xs text-[#4a3728]/70 font-bold uppercase">Streak</div>
            </div>
          </div>
        </div>

        {/* Right Side - Study Progress */}
        <div className='w-full lg:w-auto flex flex-col gap-4 sm:gap-6 mt-4 lg:mt-0'>
          {/* Motivational Quote */}
          <div className="w-full lg:max-w-xl">
            <div className="bg-linear-to-r from-[#f6ede8]/80 to-[#e0d8cf]/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-[#e0d8cf]/50 text-center">
              <p className="text-[#4a3728] font-semibold text-sm sm:text-base italic">
                "Success is the sum of small efforts repeated day in and day out."
              </p>
              <p className="text-[#4a3728]/60 text-xs font-bold mt-1.5">— Robert Collier</p>
            </div>
          </div>

          {/* Today's Study Progress */}
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
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;