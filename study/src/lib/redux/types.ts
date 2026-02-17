// Shared Redux types used across slices

export type GroupTabType = 'all' | 'created' | 'joined';

export interface Group {
  id: number;
  title: string;
  description: string;
  category: string;
  rank: number;
  visibility: 'public' | 'private';
  cameraOn: boolean;
  members: number;
  capacity: number;
  leader: string;
  goalHours: number;
  attendanceAvg: number;
  // my-groups specific fields
  isCreator?: boolean;
  joinedDate?: string;
  lastActive?: string;
  streak?: number;
  studyTime?: number;
  attendance?: number;
  cameraRequired?: boolean;
}

export interface PublicGroup {
  id: number;
  title: string;
  members: number;
}