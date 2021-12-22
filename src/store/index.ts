import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './slices/board-slice'

import 'element-theme-default';

export const store = configureStore({
    reducer: {
        boardSlice
        },
    })
    

    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch