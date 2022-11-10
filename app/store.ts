import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import globalStateReducer from './GlobalSlice'
import userStateReducer from './UserSlice'
import journalStateReducer from './JournalSlice'

const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
    user: userStateReducer,
    journal: journalStateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store