import { RootState } from "./store"
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { applyScheduleFirestore } from "../infrastructure/services/firebase/Schedule";
import { getAllCircleFirestore, getMyCircleFirestore, saveCircleFirestore, updateCircleFirestore, delCircleFirestore } from "../infrastructure/services/firebase/Circle";

export const getAllCircle = createAsyncThunk('circle/getAllCircle', async () => {
  return await getAllCircleFirestore()
})

export const getMyCircle = createAsyncThunk('circle/getMyCircle', async (email: string | null = '') => {
  return await getMyCircleFirestore(email)
})

export const createCircle = createAsyncThunk('circle/createCircle', async (data: any) => {
  return await toast.promise(saveCircleFirestore(data), {
    pending: 'Creating ...', success: 'Create Complete 👌', error: 'Create Failed 🤯'
  });
})

export const editCircle = createAsyncThunk('circle/editCircle', async (data: any) => {
  return await toast.promise(updateCircleFirestore(data), {
    pending: 'Updating ...', success: 'Update Complete 👌', error: 'Update Failed 🤯'
  });
})

export const delCircle = createAsyncThunk('circle/delCircle', async (id: any) => {
  return await toast.promise(delCircleFirestore(id), {
    pending: 'Deleting ...', success: 'Delete Complete 👌', error: 'Delete Failed 🤯'
  });
})

export const applyCircle = createAsyncThunk('circle/applyCircle', async (id: any) => {
  return await toast.promise(applyScheduleFirestore(id), {
    pending: 'Applying ...', success: 'Apply Complete 👌', error: 'Apply Failed 🤯'
  });
})

export const leaveCircle = createAsyncThunk('circle/leaveCircle', async (id: any) => {
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
    // GET ALL CIRCLE
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
    // GET MY CIRCLE
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
    // CERATE CIRCLE
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
    // EDIT CIRCLE
    builder.addCase(editCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(editCircle.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(editCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // DEL CIRCLE
    builder.addCase(delCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(delCircle.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(delCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // APPLY CIRCLE
    builder.addCase(applyCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(applyCircle.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(applyCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // LEAVE CIRCLE
    builder.addCase(leaveCircle.pending, state => { state.isLoading = true; state.errorMessage = '' })
    builder.addCase(leaveCircle.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(leaveCircle.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
  }
})

export const { setCircleDetail } = circleSlice.actions
export const selectCircleState = (state: RootState) => state.circle  // SELECTOR
export default circleSlice.reducer