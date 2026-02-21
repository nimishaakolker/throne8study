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