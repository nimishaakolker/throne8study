import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type Goal = {
    id : String;
    title : String;
    completed : boolean;
};

type GoalsState = {
    items : Goal[];
};
const initialState : GoalsState = {
    items: []
};

const goalsSlice = createSlice({
    name : "goals",
    initialState,
    reducers : {
        addGoal : (state, action:PayloadAction<{title:string}>) => {
           state.items.push({
             id: crypto.randomUUID(),
             title: action.payload.title,
             completed: false,
           });
        }

        
    }
})

export const { addGoal} = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer