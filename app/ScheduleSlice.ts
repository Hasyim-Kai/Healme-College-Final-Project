import { RootState } from "./store"
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllScheduleFirestore, getMyScheduleFirestore, saveScheduleFirestore, updateScheduleFirestore, delScheduleFirestore, applyScheduleFirestore } from "../infrastructure/services/firebase/Schedule";

export const getAllSchedule = createAsyncThunk('schedule/getAllSchedule', async () => {
   return await getAllScheduleFirestore()
})

export const getMySchedule = createAsyncThunk('schedule/getMySchedule', async (email: string | null = '') => {
   return await getMyScheduleFirestore(email)
})

export const createSchedule = createAsyncThunk('schedule/createSchedule', async (data: any) => {
   return await saveScheduleFirestore(data)
})

export const editSchedule = createAsyncThunk('schedule/editSchedule', async (data: any) => {
   return await updateScheduleFirestore(data)
})

export const delSchedule = createAsyncThunk('schedule/delSchedule', async (id: any) => {
   return await delScheduleFirestore(id)
})

export const applySchedule = createAsyncThunk('schedule/applySchedule', async (id: any) => {
   return await toast.promise(applyScheduleFirestore(id), {
      pending: 'Creating ...',
      success: 'Create Complete 👌',
      error: 'Create Failed 🤯'
   });
})

const initState: ScheduleSliceType = {
   schedules: [],
   scheduleDetail: {},
   isLoading: false,
   errorMessage: ''
}

const scheduleSlice = createSlice({
   name: 'schedule', initialState: initState, reducers: {
      setIsLoading(state) { state.isLoading = true; state.errorMessage = '' },
      setScheduleDetail(state, action) {
         state.scheduleDetail = action.payload
      },
   }, extraReducers: builder => {
      // GET ALL SCHEDULE
      builder.addCase(getMySchedule.pending, state => { setIsLoading() })
      builder.addCase(getMySchedule.fulfilled, (state, action: any) => {
         state.isLoading = false
         state.schedules = action.payload.docs.map((doc: any) => {
            return { data: doc.data(), id: doc.id }
         })
      })
      builder.addCase(getMySchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // GET MY SCHEDULE
      builder.addCase(getMySchedule.pending, state => { setIsLoading() })
      builder.addCase(getMySchedule.fulfilled, (state, action: any) => {
         state.isLoading = false
         state.schedules = action.payload.docs.map((doc: any) => {
            return { data: doc.data(), id: doc.id }
         })
      })
      builder.addCase(getMySchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // CERATE SCHEDULE
      builder.addCase(createSchedule.pending, state => { setIsLoading() })
      builder.addCase(createSchedule.fulfilled, (state, action: any) => {
         if (action.payload.id !== '' || action.payload.id !== undefined) {
            state.isLoading = false
         }
      })
      builder.addCase(createSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // EDIT SCHEDULE
      builder.addCase(editSchedule.pending, state => { setIsLoading() })
      builder.addCase(editSchedule.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(editSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // DEL SCHEDULE
      builder.addCase(delSchedule.pending, state => { setIsLoading() })
      builder.addCase(delSchedule.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(delSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // APPLY SCHEDULE
      builder.addCase(applySchedule.pending, state => { setIsLoading() })
      builder.addCase(applySchedule.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(applySchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
   }
})

export const { setIsLoading, setScheduleDetail } = scheduleSlice.actions
export const selectScheduleState = (state: RootState) => state.schedule  // SELECTOR
export default scheduleSlice.reducer