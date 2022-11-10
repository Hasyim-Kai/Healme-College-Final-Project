import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getJournalFirestore } from "../infrastructure/services/firebase/Journal";
import { RootState } from "./store"

export const getJournals = createAsyncThunk('journal/getJournals', async () => {
  return await getJournalFirestore()
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
    builder.addCase(getJournals.fulfilled, (state, action) => {
      state.isLoading = false
      state.journals = action.payload.docs.map((doc: any) => {
        return { data: doc.data(), id: doc.id }
      })
    })
    builder.addCase(getJournals.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.error.message || 'Something went wrong'
    })
  }
})

export const { setJournalDetail } = journalSlice.actions
export const selectJournalState = (state: RootState) => state.journal  // SELECTOR
export default journalSlice.reducer