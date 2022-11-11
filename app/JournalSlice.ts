import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { delJournalFirestore, getJournalFirestore, saveJournalFirestore, updateJournalFirestore } from "../infrastructure/services/firebase/Journal";
import { RootState } from "./store"

export const getJournals = createAsyncThunk('journal/getJournals', async (email: string | null = '') => {
  return await getJournalFirestore(email)
})

export const createJournals = createAsyncThunk('journal/createJournals', async (data: any) => {
  return await toast.promise(saveJournalFirestore(data), {
    pending: 'Creating ...',
    success: 'Create Complete 👌',
    error: 'Create Failed 🤯'
  });
})

export const editJournals = createAsyncThunk('journal/editJournals', async (data: any) => {
  return await toast.promise(updateJournalFirestore(data), {
    pending: 'Updating ...',
    success: 'Update Complete 👌',
    error: 'Update Failed 🤯'
  });
})

export const delJournals = createAsyncThunk('journal/delJournals', async (id: any) => {
  return await toast.promise(delJournalFirestore(id), {
    pending: 'Deleting ...',
    success: 'Delete Complete 👌',
    error: 'Delete Failed 🤯'
  });
})

const initState: JournalSliceType = {
  journals: [],
  journalDetail: {},
  isLoading: false,
  errorMessage: ''
}

const journalSlice = createSlice({
  name: 'journal', initialState: initState, reducers: {
    setJournalDetail(state, action) {
      state.journalDetail = action.payload
    }
  }, extraReducers: builder => {
    // GET JOURNALS
    builder.addCase(getJournals.pending, state => {
      state.isLoading = true
      state.errorMessage = ''
    })
    builder.addCase(getJournals.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.journals = action.payload.docs.map((doc: any) => {
        return { data: doc.data(), id: doc.id }
      })
    })
    builder.addCase(getJournals.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // SAVE JOURNALS
    builder.addCase(createJournals.pending, state => {
      state.isLoading = true
      state.errorMessage = ''
    })
    builder.addCase(createJournals.fulfilled, (state, action: any) => {
      if (action.payload.id !== '' || action.payload.id !== undefined) {
        state.isLoading = false
      }
    })
    builder.addCase(createJournals.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // EDIT JOURNALS
    builder.addCase(editJournals.pending, state => {
      state.isLoading = true
      state.errorMessage = ''
    })
    builder.addCase(editJournals.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(editJournals.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
    // DEL JOURNALS
    builder.addCase(delJournals.pending, state => {
      state.isLoading = true
      state.errorMessage = ''
    })
    builder.addCase(delJournals.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(delJournals.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
  }
})

export const { setJournalDetail } = journalSlice.actions
export const selectJournalState = (state: RootState) => state.journal  // SELECTOR
export default journalSlice.reducer