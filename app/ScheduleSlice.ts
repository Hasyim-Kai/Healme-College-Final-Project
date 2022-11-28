import { RootState } from "./store"
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllScheduleFirestore, saveScheduleFirestore, updateScheduleFirestore, delScheduleFirestore, getUserScheduleFirestore, getCounselorScheduleFirestore } from "../infrastructure/services/firebase/Schedule";
import { getCurrentDate, formatDate } from "../presentation/utils/DateFormatter";

export const getAllSchedule = createAsyncThunk('schedule/getAllSchedule', async () => {
   return await getAllScheduleFirestore()
})

export const getCounselorSchedule = createAsyncThunk('schedule/getCounselorSchedule', async (name: string | null = '') => {
   return await getCounselorScheduleFirestore(name)
})

export const getUserSchedule = createAsyncThunk('schedule/getUserSchedule', async (name: string | null = '') => {
   return await getUserScheduleFirestore(name)
})

export const createSchedule = createAsyncThunk('schedule/createSchedule', async (data: any) => {
   return await toast.promise(saveScheduleFirestore(data), {
      pending: 'Creating ...', success: 'Create Complete 👌', error: 'Create Failed 🤯'
   });
})

export const editSchedule = createAsyncThunk('schedule/editSchedule', async (data: any) => {
   return await toast.promise(updateScheduleFirestore(data), {
      pending: 'Updating ...', success: 'Update Complete 👌', error: 'Update Failed 🤯'
   });
})

export const delSchedule = createAsyncThunk('schedule/delSchedule', async (id: any) => {
   return await toast.promise(delScheduleFirestore(id), {
      pending: 'Deleting ...', success: 'Delete Complete 👌', error: 'Delete Failed 🤯'
   });
})

export const applySchedule = createAsyncThunk('schedule/applySchedule', async (data: any) => {
   return await toast.promise(updateScheduleFirestore(data), {
      pending: 'Applying ...', success: 'Apply Complete 👌', error: 'Apply Failed 🤯'
   });
})

const initState: ScheduleSliceType = {
   schedules: [],
   scheduleDetail: { session: '1', gmeetLink: '#' },
   isLoading: false,
   errorMessage: '',
   isBooked: false
}

const scheduleSlice = createSlice({
   name: 'schedule', initialState: initState, reducers: {
      setScheduleDetail(state, action) {
         state.scheduleDetail = action.payload
      },
      checkIsBooked(state) {
         state.isBooked = state.scheduleDetail.patient_name === undefined ? false : true
      },
   }, extraReducers: builder => {
      // GET ALL SCHEDULE
      builder.addCase(getAllSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(getAllSchedule.fulfilled, (state, action: any) => {
         state.isLoading = false
         state.schedules = action.payload.docs.map((doc: any) => {
            return { data: doc.data(), id: doc.id }
         }).filter((schedule: any) => { // Filtering only today Schedule
            return getCurrentDate() === formatDate(schedule.data.date)
         })
      })
      builder.addCase(getAllSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // GET COUNSELOR SCHEDULE
      builder.addCase(getCounselorSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(getCounselorSchedule.fulfilled, (state, action: any) => {
         state.isLoading = false
         state.schedules = action.payload.docs.map((doc: any) => {
            return { data: doc.data(), id: doc.id }
         })
      })
      builder.addCase(getCounselorSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // GET USER SCHEDULE
      builder.addCase(getUserSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(getUserSchedule.fulfilled, (state, action: any) => {
         state.isLoading = false
         state.schedules = action.payload.docs.map((doc: any) => {
            return { data: doc.data(), id: doc.id }
         })
      })
      builder.addCase(getUserSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // CERATE SCHEDULE
      builder.addCase(createSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
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
      builder.addCase(editSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(editSchedule.fulfilled, (state, action) => {
         state.isLoading = false
      })
      builder.addCase(editSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // DEL SCHEDULE
      builder.addCase(delSchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(delSchedule.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(delSchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
      // APPLY SCHEDULE
      builder.addCase(applySchedule.pending, state => { state.isLoading = true; state.errorMessage = '' })
      builder.addCase(applySchedule.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(applySchedule.rejected, (state, action) => {
         state.isLoading = false
         state.errorMessage = action.error.message || 'Something went wrong'
      })
   }
})

export const { setScheduleDetail, checkIsBooked } = scheduleSlice.actions
export const selectScheduleState = (state: RootState) => state.schedule  // SELECTOR
export default scheduleSlice.reducer