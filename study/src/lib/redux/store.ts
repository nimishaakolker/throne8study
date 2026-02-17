import { configureStore } from '@reduxjs/toolkit';
import { goalsReducer }  from './features/goals/goalsSlice';
import { todoReducer }   from './features/todo/todoSlice';
import { timerReducer }  from './features/timer/timerSlice';
import { groupsReducer } from './features/groups/groupsSlice';
import { userReducer }   from './features/user/userSlice';

// ============================================================
// LOAD STATE
// ============================================================
const loadState = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    const data = localStorage.getItem('reduxState');
    if (!data) return undefined;

    const parsed = JSON.parse(data);

    // Always start timer fresh
    if (parsed.timer) {
      delete parsed.timer.minutes;
      delete parsed.timer.seconds;
      delete parsed.timer.isActive;
      delete parsed.timer.isBreakMode;
    }

    if (parsed.goals?.weeklyGoals === undefined) {
      delete parsed.goals;
    }

    return parsed;
  } catch (e) {
    return undefined;
  }
};

// ============================================================
// SAVE STATE
// ============================================================
const saveState = (state: any) => {
  if (typeof window === 'undefined') return;

  try {
    const toSave = {
      todos: state.todos,
      timer: {
        subject:           state.timer.subject,
        customMinutes:     state.timer.customMinutes,
        studySessions:     state.timer.studySessions,
        totalStudyTime:    state.timer.totalStudyTime,
        completedSessions: state.timer.completedSessions,
        weeklyStats:       state.timer.weeklyStats,
        streakCount:       state.timer.streakCount,
        lastStudyDate:     state.timer.lastStudyDate,
      },
      goals: state.goals,
      user:  state.user,

      // Persist group data only — UI state resets on every load
      // (searchQuery, activeTab, settingsGroupId, isCreateModalOpen,
      //  expandedSections are intentionally NOT saved)
      groups: {
        items:          state.groups.items,
        publicGroups:   state.groups.publicGroups,
        joinedGroupIds: state.groups.joinedGroupIds,
      },
    };

    localStorage.setItem('reduxState', JSON.stringify(toSave));
  } catch (e) {
    console.error('Save error:', e);
  }
};

// ============================================================
// STORE
// ============================================================
export const store = configureStore({
  reducer: {
    goals:  goalsReducer,
    todos:  todoReducer,
    timer:  timerReducer,
    groups: groupsReducer,
    user:   userReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;