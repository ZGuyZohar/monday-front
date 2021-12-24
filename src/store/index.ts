import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './slices/board-slice'


export const store = configureStore({
    reducer: {
        boardSlice
        },
    })
    

    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch