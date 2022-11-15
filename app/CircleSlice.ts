import { RootState } from "./store"
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllScheduleFirestore, getMyScheduleFirestore, saveScheduleFirestore, updateScheduleFirestore, delScheduleFirestore, applyScheduleFirestore } from "../infrastructure/services/firebase/Schedule";

export const getAllCircle = createAsyncThunk('circle/getAllSchedule', async () => {
  return await getAllScheduleFirestore()
})

export const getMyCircle = createAsyncThunk('circle/getMySchedule', async (email: string | null = '') => {
  return await getMyScheduleFirestore(email)
})

export const createCircle = createAsyncThunk('circle/createSchedule', async (data: any) => {
  return await toast.promise(saveScheduleFirestore(data), {
    pending: 'Creating ...', success: 'Create Complete 👌', error: 'Create Failed 🤯'
  });
})

export const editCircle = createAsyncThunk('circle/editSchedule', async (data: any) => {
  return await toast.promise(updateScheduleFirestore(data), {
    pending: 'Updating ...', success: 'Update Complete 👌', error: 'Update Failed 🤯'
  });
})

export const delCircle = createAsyncThunk('circle/delSchedule', async (id: any) => {
  return await toast.promise(delScheduleFirestore(id), {
    pending: 'Deleting ...', success: 'Delete Complete 👌', error: 'Delete Failed 🤯'
  });
})

export const applyCircle = createAsyncThunk('circle/applySchedule', async (id: any) => {
  return await toast.promise(applyScheduleFirestore(id), {
    pending: 'Applying ...', success: 'Apply Complete 👌', error: 'Apply Failed 🤯'
  });
})

const initState: CircleSliceType = {
  circles: [],
  circlesDetail: {},
  isLoading: false,
  errorMessage: ''
}

const circleSlice = createSlice({
  name: 'circle', initialState: initState, reducers: {
    setCircleDetail(state, action) {
      state.circlesDetail = action.payload
    },
  }, extraReducers: builder => {
    // GET ALL SCHEDULE
    builder.addCase(getAllCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(getAllCircle.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.circles = action.payload.docs.map((doc: any) => {
        return { data: doc.data(), id: doc.id }
      })
    })
    builder.addCase(getAllCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // GET MY SCHEDULE
    builder.addCase(getMyCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(getMyCircle.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.circles = action.payload.docs.map((doc: any) => {
        return { data: doc.data(), id: doc.id }
      })
    })
    builder.addCase(getMyCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // CERATE SCHEDULE
    builder.addCase(createCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(createCircle.fulfilled, (state, action: any) => {
      if (action.payload.id !== '' || action.payload.id !== undefined) {
        state.isLoading = false
      }
    })
    builder.addCase(createCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // EDIT SCHEDULE
    builder.addCase(editCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(editCircle.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(editCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // DEL SCHEDULE
    builder.addCase(delCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(delCircle.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(delCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // APPLY SCHEDULE
    builder.addCase(applyCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(applyCircle.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(applyCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
  }
})

export const { setCircleDetail } = circleSlice.actions
export const selectCircleState = (state: RootState) => state.circle  // SELECTOR
export default circleSlice.reducer