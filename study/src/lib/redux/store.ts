import { configureStore } from '@reduxjs/toolkit';
import { goalsReducer }  from './features/goals/goalsSlice';
import { todoReducer }   from './features/todo/todoSlice';
import { timerReducer }  from './features/timer/timerSlice';
import { groupsReducer } from './features/groups/groupsSlice';
import { userReducer }   from './features/user/userSlice';

const loadState = () => {
  if (typeof window === 'undefined') return undefined;
  try {
    const data = localStorage.getItem('reduxState');
    if (!data) return undefined;
    const parsed = JSON.parse(data);

    // Reset volatile timer fields so timer always starts fresh
    if (parsed.timer) {
      delete parsed.timer.minutes;
      delete parsed.timer.seconds;
      delete parsed.timer.isActive;
      delete parsed.timer.isBreakMode;
    }

    // Guard: goals must have weeklyGoals or we discard it
    if (parsed.goals?.weeklyGoals === undefined) {
      delete parsed.goals;
    }

    // Guard: ensure groups state has all required fields with safe defaults
    // (old localStorage may be missing fields added in newer versions)
    if (parsed.groups) {
      parsed.groups = {
        browseSearchQuery:  '',
        isCreateModalOpen:  false,
        expandedSections:   { university: false, dsa: false, jee: false, public: false },
        activeTab:          'all',
        searchQuery:        '',
        settingsGroupId:    null,
        joinedGroupIds:     [],
        browseItems:        [],
        publicGroups:       [],
        items:              [],
        // Now overlay with whatever was actually saved (safe fields only)
        ...parsed.groups,
        // Always reset these volatile UI fields to their defaults
        browseSearchQuery:  parsed.groups.browseSearchQuery  ?? '',
        isCreateModalOpen:  false,
        expandedSections:   parsed.groups.expandedSections   ?? { university: false, dsa: false, jee: false, public: false },
        activeTab:          parsed.groups.activeTab          ?? 'all',
        searchQuery:        parsed.groups.searchQuery        ?? '',
        settingsGroupId:    null,
      };
    }

    return parsed;
  } catch (e) {
    return undefined;
  }
};

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
      groups: {
        items:          state.groups.items,
        browseItems:    state.groups.browseItems,
        publicGroups:   state.groups.publicGroups,
        joinedGroupIds: state.groups.joinedGroupIds,
      },
    };
    localStorage.setItem('reduxState', JSON.stringify(toSave));
  } catch (e) {
    console.error('Save error:', e);
  }
};

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