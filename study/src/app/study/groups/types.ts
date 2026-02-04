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
}
