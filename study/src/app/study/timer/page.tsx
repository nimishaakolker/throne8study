'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { 
  decrementTime, 
  completeSession, 
  startBreak, 
  endBreak 
} from '@/lib/redux/features/timer/timerSlice';
import { useEffect, useRef } from 'react';

import TimerTabs from './components/TimerTabs';
import TimerDisplay from './components/TimerDisplay';
import CustomTimerControls from './components/CustomTimerControls';
import SubjectInput from './components/SubjectInput';
import TimerControls from './components/TimerControls';
import TimerStats from './components/TimerStats';
import MotivationalQuote from './components/MotivationalQuote';
import StudyProgress from './components/StudyProgress';

export default function PomodoroTimer() {
  const dispatch = useAppDispatch();
  
  const isActive = useAppSelector(state => state.timer.isActive);
  const minutes = useAppSelector(state => state.timer.minutes);
  const seconds = useAppSelector(state => state.timer.seconds);
  const isBreakMode = useAppSelector(state => state.timer.isBreakMode);
  const activeTab = useAppSelector(state => state.timer.activeTab);
  const customMinutes = useAppSelector(state => state.timer.customMinutes);
  const completedSessions = useAppSelector(state => state.timer.completedSessions);

  // Use ref to track if timer just completed
  const justCompleted = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        // Check BEFORE decrement
        if (minutes === 0 && seconds === 0) {
          // Timer already at zero - complete it
          if (!justCompleted.current) {
            justCompleted.current = true;
            handleTimerComplete();
          }
          return;
        }
        
        // Check if NEXT tick will be 00:00
        if (minutes === 0 && seconds === 1) {
          dispatch(decrementTime());
          if (!justCompleted.current) {
            justCompleted.current = true;
            setTimeout(() => handleTimerComplete(), 100);
          }
          return;
        }
        
        justCompleted.current = false;
        dispatch(decrementTime());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    justCompleted.current = false;
    
    if (activeTab === 'pomodoro') {
      if (isBreakMode) {
        dispatch(endBreak());
      } else {
        dispatch(completeSession());
        const isLongBreak = (completedSessions + 1) % 4 === 0;
        dispatch(startBreak(isLongBreak ? 'long' : 'short'));
      }
    } else {
      dispatch(completeSession());
    }
  };

  // Calculate progress
  const tabDuration = activeTab === 'timer'
    ? (customMinutes || 15)
    : (activeTab === 'pomodoro' ? 25 : 45);
  
  const totalSeconds = tabDuration * 60;
  const remainingSeconds = (minutes || 0) * 60 + (seconds || 0);
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center justify-start p-3 sm:p-4 lg:p-6 lg:justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
        
        {/* Left Side - Timer */}
        <div className="w-full lg:flex-1 lg:max-w-lg">
          <TimerTabs />
          <TimerDisplay progress={progress} />
          {activeTab === 'timer' && <CustomTimerControls />}
          <SubjectInput />
          <TimerControls />
          <TimerStats />
        </div>

        {/* Right Side */}
        <div className='w-full lg:w-auto flex flex-col gap-4 sm:gap-6 mt-4 lg:mt-0'>
          <MotivationalQuote />
          <StudyProgress />
        </div>
        
      </div>
    </div>
  );
}