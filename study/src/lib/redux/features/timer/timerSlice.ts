import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StudySession {
  subject: string;
  time: number;
  date: string;
}

export interface TimerSettings {
  pomodoroMinutes: number;
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

interface TimerState {
  activeTab: 'pomodoro' | 'focus' | 'timer';
  minutes: number;
  seconds: number;
  isActive: boolean;
  subject: string;
  customMinutes: number;
  studySessions: StudySession[];
  totalStudyTime: number;
  sessionStartTime: number | null;
  completedSessions: number;
  isBreakMode: boolean;
  settings: TimerSettings;
  dailyGoal: number;
  weeklyStats: { [date: string]: number };
  streakCount: number;
  lastStudyDate: string | null;
}

const initialState: TimerState = {
  activeTab: 'pomodoro',
  minutes: 25,
  seconds: 0,
  isActive: false,
  subject: '',
  customMinutes: 15,
  studySessions: [],
  totalStudyTime: 0,
  sessionStartTime: null,
  completedSessions: 0,
  isBreakMode: false,
  settings: {
    pomodoroMinutes: 25,
    focusMinutes: 45,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    autoStartBreaks: true,
    autoStartPomodoros: true,
  },
  dailyGoal: 120,
  weeklyStats: {},
  streakCount: 0,
  lastStudyDate: null,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {

    setActiveTab: (state, action: PayloadAction<'pomodoro' | 'focus' | 'timer'>) => {
      state.activeTab = action.payload;
      state.isBreakMode = false;
      state.isActive = false;
      state.sessionStartTime = null;
      state.seconds = 0;

      if (action.payload === 'pomodoro') {
        state.minutes = state.settings?.pomodoroMinutes ?? 25;
      } else if (action.payload === 'focus') {
        state.minutes = state.settings?.focusMinutes ?? 45;
      } else {
        state.minutes = state.customMinutes ?? 15;
      }
    },

    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload;
    },

    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },

    decrementTime: (state) => {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          state.isActive = false;
        } else {
          state.minutes -= 1;
          state.seconds = 59;
        }
      } else {
        state.seconds -= 1;
      }
    },

    toggleTimer: (state) => {
      state.isActive = !state.isActive;

      if (state.isActive && !state.isBreakMode && !state.sessionStartTime) {
        state.sessionStartTime = Date.now();
      }
    },

    resetTimer: (state) => {
      state.isActive = false;
      state.isBreakMode = false;
      state.sessionStartTime = null;
      state.seconds = 0;

      if (state.activeTab === 'pomodoro') {
        state.minutes = state.settings?.pomodoroMinutes ?? 25;
      } else if (state.activeTab === 'focus') {
        state.minutes = state.settings?.focusMinutes ?? 45;
      } else {
        state.minutes = state.customMinutes ?? 15;
      }
    },

    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },

    setCustomMinutes: (state, action: PayloadAction<number>) => {
      state.customMinutes = action.payload;
      if (state.activeTab === 'timer' && !state.isActive) {
        state.minutes = action.payload;
        state.seconds = 0;
      }
    },

    addStudySession: (state, action: PayloadAction<{ subject: string; duration: number }>) => {
      const { subject, duration } = action.payload;
      const finalSubject = subject.trim() || "Other";
      const today = new Date().toISOString().split('T')[0];

      const existingIndex = state.studySessions.findIndex(s => s.subject === finalSubject);
      if (existingIndex >= 0) {
        state.studySessions[existingIndex].time += duration;
      } else {
        state.studySessions.push({
          subject: finalSubject,
          time: duration,
          date: today,
        });
      }

      state.totalStudyTime += duration;

      if (!state.weeklyStats[today]) {
        state.weeklyStats[today] = 0;
      }
      state.weeklyStats[today] += duration;

      if (state.lastStudyDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (state.lastStudyDate === yesterday) {
          state.streakCount += 1;
        } else {
          state.streakCount = 1;
        }
        state.lastStudyDate = today;
      }
    },

    completeSession: (state) => {
      state.completedSessions += 1;

      if (state.sessionStartTime && !state.isBreakMode) {
        const duration = Math.ceil((Date.now() - state.sessionStartTime) / 60000);
        const finalSubject = state.subject.trim() || "Other";
        const today = new Date().toISOString().split('T')[0];

        const existingIndex = state.studySessions.findIndex(s => s.subject === finalSubject);
        if (existingIndex >= 0) {
          state.studySessions[existingIndex].time += duration;
        } else {
          state.studySessions.push({
            subject: finalSubject,
            time: duration,
            date: today,
          });
        }

        state.totalStudyTime += duration;

        if (!state.weeklyStats[today]) {
          state.weeklyStats[today] = 0;
        }
        state.weeklyStats[today] += duration;
      }

      state.sessionStartTime = null;
    },

    startBreak: (state, action: PayloadAction<'short' | 'long'>) => {
      state.isBreakMode = true;
      state.seconds = 0;
      state.minutes = action.payload === 'short'
        ? state.settings?.shortBreakMinutes ?? 5
        : state.settings?.longBreakMinutes ?? 15;

      if (state.settings?.autoStartBreaks) {
        state.isActive = true;
      }
    },

    endBreak: (state) => {
      state.isBreakMode = false;
      state.seconds = 0;
      state.minutes = state.settings?.pomodoroMinutes ?? 25;

      if (state.settings?.autoStartPomodoros) {
        state.isActive = true;
        state.sessionStartTime = Date.now();
      }
    },

    setSessionStartTime: (state, action: PayloadAction<number | null>) => {
      state.sessionStartTime = action.payload;
    },

    updateSettings: (state, action: PayloadAction<Partial<TimerSettings>>) => {
      state.settings = {
        ...state.settings,
        ...action.payload,
      };
    },

    resetDailyStats: (state) => {
      state.studySessions = [];
      state.totalStudyTime = 0;
      state.completedSessions = 0;
    },
  }
});

export const {
  setActiveTab,
  setMinutes,
  setSeconds,
  decrementTime,
  toggleTimer,
  resetTimer,
  setSubject,
  setCustomMinutes,
  addStudySession,
  completeSession,
  startBreak,
  endBreak,
  setSessionStartTime,
  updateSettings,
  resetDailyStats,
} = timerSlice.actions;

export const timerReducer = timerSlice.reducer;