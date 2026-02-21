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