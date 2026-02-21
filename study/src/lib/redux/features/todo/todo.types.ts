export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Todos {
  [dateStr: string]: Todo[];
}