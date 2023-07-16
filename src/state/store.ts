
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from "./taskSlice";
import {todolistsReducer} from "./todolistSlice";

let persistedState;
const localStorageState = localStorage.getItem('state')
if (localStorageState !== null) {
     persistedState = JSON.parse(localStorageState)
}
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
// @ts-ignore
window.store = store;

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})