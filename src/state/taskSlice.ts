import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistItem, removeTodolistItem} from "state/todolistSlice";
import {TasksStateType} from "App";
import {v1} from "uuid";

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTasks(state, action: PayloadAction<{title:string, todolistId: string}>) {
            state[action.payload.todolistId].unshift({id: v1(), isDone: false, title: action.payload.title})
        },
        removeTasks(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        changeTasksTitle(state, action: PayloadAction<{taskId:string, todolistId: string, title:string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], title: action.payload.title}
            }
        },
        changeTasksStatus(state, action: PayloadAction<{taskId:string, isDone:boolean, todolistId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], isDone: action.payload.isDone}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistItem, (state, action) => {
            state[action.payload.newTodolist.id] = [];
        });
        builder.addCase(removeTodolistItem, (state, action) => {
            delete state[action.payload.todolistId];
        });
    }
})
export const tasksReducer = tasksSlice.reducer;

export const {addTasks,removeTasks,changeTasksTitle, changeTasksStatus} = tasksSlice.actions

export default tasksSlice.reducer