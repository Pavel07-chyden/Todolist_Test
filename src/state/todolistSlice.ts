import {RootState} from "./store";
import {v1} from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../App";

export const initialState:TasksStateType=[] as never



const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action:PayloadAction<{title:string, todolistId:string}>) {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            const newTasks= [newTask, ...state[action.payload.todolistId]];
            state[action.payload.todolistId] = newTasks
        }}

})
export const selectSliceTasks =(state:RootState)=>state.tasks

export const tasksReducer = tasksSlice.reducer;


export const { addTask} =
    tasksSlice.actions

export default tasksSlice.reducer