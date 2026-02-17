import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

// ============ GOALS SELECTORS ============
export const selectAllGoals = (state: RootState) => state.goals.items;
export const selectGoalsFilter = (state: RootState) => state.goals.filter;
export const selectGoalsSearchQuery = (state: RootState) => state.goals.searchQuery;

export const selectFilteredGoals = createSelector(
  [selectAllGoals, selectGoalsFilter, selectGoalsSearchQuery],
  (goals, filter, searchQuery) => {
    let filtered = goals;

    if (filter === 'active') {
      filtered = filtered.filter(goal => !goal.completedAt);
    } else if (filter === 'completed') {
      filtered = filtered.filter(goal => goal.completedAt);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(goal =>
        goal.title.toLowerCase().includes(query) ||
        goal.labels.some(label => label.name.toLowerCase().includes(query))
      );
    }

    return filtered;
  }
);

export const selectGoalsStats = createSelector(
  [selectAllGoals],
  (goals) => ({
    total: goals.length,
    completed: goals.filter(g => g.completedAt).length,
    active: goals.filter(g => !g.completedAt).length,
    completionRate: goals.length > 0
      ? Math.round((goals.filter(g => g.completedAt).length / goals.length) * 100)
      : 0,
  })
);

// ============ TODOS SELECTORS ============
export const selectAllTodos = (state: RootState) => state.todos.items;
export const selectTodosByDate = (dateStr: string) => (state: RootState) =>
  state.todos.items[dateStr] || [];

export const selectTodoStats = (dateStr: string) => (state: RootState) => {
  const todos = state.todos.items[dateStr] || [];
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };
};

// ============ TIMER SELECTORS ============
export const selectTimerState = (state: RootState) => ({
  activeTab: state.timer.activeTab,
  minutes: state.timer.minutes,
  seconds: state.timer.seconds,
  isActive: state.timer.isActive,
  isBreakMode: state.timer.isBreakMode,
  subject: state.timer.subject,
});

export const selectStudySessions = (state: RootState) => state.timer.studySessions;
export const selectTotalStudyTime = (state: RootState) => state.timer.totalStudyTime;
export const selectCompletedSessions = (state: RootState) => state.timer.completedSessions;

export const selectDailyProgress = createSelector(
  [selectTotalStudyTime, (state: RootState) => state.timer.dailyGoal],
  (studyTime, goal) => ({
    current: studyTime,
    goal,
    percentage: goal > 0 ? Math.min(Math.round((studyTime / goal) * 100), 100) : 0,
    remaining: Math.max(goal - studyTime, 0),
  })
);

export const selectSubjectBreakdown = createSelector(
  [selectStudySessions],
  (sessions) => {
    const breakdown = sessions.reduce((acc, session) => {
      if (!acc[session.subject]) {
        acc[session.subject] = 0;
      }
      acc[session.subject] += session.time;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(breakdown)
      .map(([subject, time]) => ({ subject, time }))
      .sort((a, b) => b.time - a.time);
  }
);