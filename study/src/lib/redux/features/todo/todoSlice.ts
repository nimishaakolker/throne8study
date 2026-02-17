import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Todos {
  [dateStr: string]: Todo[];
}

interface TodosState {
  items: Todos;
  nextId: number;
}

const initialState: TodosState = {
  items: {},
  nextId: 1,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ dateStr: string; text: string }>) => {
      const { dateStr, text } = action.payload;
      
      if (!state.items[dateStr]) {
        state.items[dateStr] = [];
      }
      
      state.items[dateStr].push({
        id: state.nextId,
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      
      state.nextId += 1;
    },

    toggleTodo: (state, action: PayloadAction<{ dateStr: string; todoId: number }>) => {
      const { dateStr, todoId } = action.payload;
      const todos = state.items[dateStr];
      
      if (todos) {
        const todo = todos.find(t => t.id === todoId);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    },

    deleteTodo: (state, action: PayloadAction<{ dateStr: string; todoId: number }>) => {
      const { dateStr, todoId } = action.payload;
      
      if (state.items[dateStr]) {
        state.items[dateStr] = state.items[dateStr].filter(t => t.id !== todoId);
        
        if (state.items[dateStr].length === 0) {
          delete state.items[dateStr];
        }
      }
    },

    updateTodo: (state, action: PayloadAction<{ dateStr: string; todoId: number; text: string }>) => {
      const { dateStr, todoId, text } = action.payload;
      const todos = state.items[dateStr];
      
      if (todos) {
        const todo = todos.find(t => t.id === todoId);
        if (todo) {
          todo.text = text;
        }
      }
    },

    clearCompletedTodos: (state, action: PayloadAction<string>) => {
      const dateStr = action.payload;
      
      if (state.items[dateStr]) {
        state.items[dateStr] = state.items[dateStr].filter(t => !t.completed);
        
        if (state.items[dateStr].length === 0) {
          delete state.items[dateStr];
        }
      }
    },

    importTodos: (state, action: PayloadAction<Todos>) => {
      state.items = action.payload;
    },
  }
});

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  updateTodo,
  clearCompletedTodos,
  importTodos,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;