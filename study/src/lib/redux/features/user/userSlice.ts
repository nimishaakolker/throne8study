import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university?: string;
  major?: string;
  year?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    studyReminders: boolean;
    goalReminders: boolean;
  };
  studySettings: {
    defaultPomodoroLength: number;
    defaultBreakLength: number;
    autoStartBreaks: boolean;
    soundEnabled: boolean;
  };
}

interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  profile: null,
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      studyReminders: true,
      goalReminders: true,
    },
    studySettings: {
      defaultPomodoroLength: 25,
      defaultBreakLength: 5,
      autoStartBreaks: false,
      soundEnabled: true,
    },
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },

    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    },

    clearUserProfile: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.preferences.theme = action.payload;
    },

    updateNotificationSettings: (state, action: PayloadAction<Partial<UserPreferences['notifications']>>) => {
      state.preferences.notifications = {
        ...state.preferences.notifications,
        ...action.payload,
      };
    },
  }
});

export const { 
  setUserProfile,
  updateUserProfile,
  clearUserProfile,
  setTheme,
  updateNotificationSettings,
} = userSlice.actions;

export const userReducer = userSlice.reducer;