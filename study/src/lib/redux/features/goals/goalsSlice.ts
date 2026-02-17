import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Label {
  name: string;
}

export interface Goal {
  id: number;
  title: string;
  color: string;
  labels?: Label[];
  progress?: boolean[];
  days?: string[];
}

export interface WeeklyGoal extends Goal {
  completed: boolean;
}

export interface WeeklyGoals {
  Monday: WeeklyGoal[];
  Tuesday: WeeklyGoal[];
  Wednesday: WeeklyGoal[];
  Thursday: WeeklyGoal[];
  Friday: WeeklyGoal[];
  Saturday: WeeklyGoal[];
  Sunday: WeeklyGoal[];
}

interface GoalsState {
  items: Goal[];
  weeklyGoals: WeeklyGoals;
}

const initialState: GoalsState = {
  items: [],
  weeklyGoals: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Omit<Goal, 'id'>>) => {
      const newGoal: Goal = {
        ...action.payload,
        id: Date.now(),
      };
      state.items.push(newGoal);

      // Auto-add to selected days in weekly tracker
      if (newGoal.days && newGoal.days.length > 0) {
        newGoal.days.forEach(day => {
          const dayKey = day as keyof WeeklyGoals;
          if (state.weeklyGoals[dayKey]) {
            const exists = state.weeklyGoals[dayKey].some(g => g.id === newGoal.id);
            if (!exists) {
              state.weeklyGoals[dayKey].push({ ...newGoal, completed: false });
            }
          }
        });
      }
    },

    updateGoal: (state, action: PayloadAction<Goal>) => {
      const index = state.items.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      // Update in weekly goals too
      Object.keys(state.weeklyGoals).forEach(day => {
        const dayKey = day as keyof WeeklyGoals;
        state.weeklyGoals[dayKey] = state.weeklyGoals[dayKey].map(g =>
          g.id === action.payload.id ? { ...action.payload, completed: g.completed } : g
        );
      });
    },

    deleteGoal: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(g => g.id !== action.payload);
      // Remove from weekly goals too
      Object.keys(state.weeklyGoals).forEach(day => {
        const dayKey = day as keyof WeeklyGoals;
        state.weeklyGoals[dayKey] = state.weeklyGoals[dayKey].filter(
          g => g.id !== action.payload
        );
      });
    },

    toggleWeekProgress: (state, action: PayloadAction<{ goalId: number; weekIndex: number }>) => {
      const goal = state.items.find(g => g.id === action.payload.goalId);
      if (goal) {
        const newProgress = [...(goal.progress || [false, false, false, false])];
        newProgress[action.payload.weekIndex] = !newProgress[action.payload.weekIndex];
        goal.progress = newProgress;
        // Update in weekly goals too
        Object.keys(state.weeklyGoals).forEach(day => {
          const dayKey = day as keyof WeeklyGoals;
          const weeklyGoal = state.weeklyGoals[dayKey].find(g => g.id === action.payload.goalId);
          if (weeklyGoal) {
            weeklyGoal.progress = newProgress;
          }
        });
      }
    },

    addGoalToDay: (state, action: PayloadAction<{ goal: Goal; day: string }>) => {
      const dayKey = action.payload.day as keyof WeeklyGoals;
      if (state.weeklyGoals[dayKey]) {
        const exists = state.weeklyGoals[dayKey].some(g => g.id === action.payload.goal.id);
        if (!exists) {
          state.weeklyGoals[dayKey].push({ ...action.payload.goal, completed: false });
        }
      }
    },

    toggleDayGoalCompletion: (state, action: PayloadAction<{ day: string; goalId: number }>) => {
      const dayKey = action.payload.day as keyof WeeklyGoals;
      if (state.weeklyGoals[dayKey]) {
        const goal = state.weeklyGoals[dayKey].find(g => g.id === action.payload.goalId);
        if (goal) {
          goal.completed = !goal.completed;
        }
      }
    },

    removeGoalFromDay: (state, action: PayloadAction<{ day: string; goalId: number }>) => {
      const dayKey = action.payload.day as keyof WeeklyGoals;
      if (state.weeklyGoals[dayKey]) {
        state.weeklyGoals[dayKey] = state.weeklyGoals[dayKey].filter(
          g => g.id !== action.payload.goalId
        );
      }
    },
  },
});

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  toggleWeekProgress,
  addGoalToDay,
  toggleDayGoalCompletion,
  removeGoalFromDay,
} = goalsSlice.actions;

export const goalsReducer = goalsSlice.reducer;