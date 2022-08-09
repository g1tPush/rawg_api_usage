import { configureStore } from '@reduxjs/toolkit'
import orginizeReducer from '../features/orginizer/counterSlice'

export const store = configureStore({
    reducer: {
        orginizer: orginizeReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> 