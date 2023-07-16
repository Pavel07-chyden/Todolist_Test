import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterValuesType, TodolistType} from "App";

export const initialState:TodolistType[] = []

const todolistSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
            addTodolistItem(state, {payload: { newTodolist}}: PayloadAction<{ newTodolist:TodolistType }>) {
               return state = [newTodolist, ...state]
            },
            removeTodolistItem(state, {payload: {todolistId}}: PayloadAction<{ todolistId: string }>) {
                return state = state.filter((todolist) => todolist.id !== todolistId)
            },
            changeTodoTitle(state, {payload: {title, todolistId}}: PayloadAction<{
                title: string,
                todolistId: string
            }>) {
                return state = state.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist)
            },
            changeTodolistFilter(state, {payload: {filter, todolistId}}: PayloadAction<{
                todolistId: string,
                filter: FilterValuesType
            }>) {
                return state = state.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
            },
        }
    })
export const todolistsReducer = todolistSlice.reducer;

export const { addTodolistItem, removeTodolistItem,changeTodoTitle,changeTodolistFilter} =
    todolistSlice.actions

