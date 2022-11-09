import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { signInWithPopup, UserCredential } from "firebase/auth";
import { auth, googleAuthProvider } from "../infrastructure/services/firebase";
import { RootState } from "./store"

export const loginGoogle = createAsyncThunk('user/loginGoogle', async () => {
    return {
        auth: await signInWithPopup(auth, googleAuthProvider),
        userDetail: 'aaaaaaaaaaaaaaaaa',
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: {},
        isLoading: false,
        errorMessage: ''
    },
    reducers: {
        setUser(state, action) {
            state.isLoggedIn = !state.isLoggedIn
            state.userInfo = action.payload
        },
        logUserOut(state) {
            state.isLoggedIn = false
            state.userInfo = {}
        },
    },
    extraReducers: builder => {
        builder.addCase(loginGoogle.pending, state => {
            state.isLoading = true
        })
        builder.addCase(loginGoogle.fulfilled, (state, action) => {
            state.isLoggedIn = true
            state.isLoading = false
            state.errorMessage = ''
            state.userInfo = {
                token: action.payload.auth.user.accessToken,
                email: action.payload.auth.user.email,
                name: action.payload.auth.user.displayName,
                photoUrl: action.payload.auth.user.photoURL,
            }
        })
        builder.addCase(loginGoogle.rejected, (state, action) => {
            state.isLoading = false
            state.userInfo = []
            state.errorMessage = action.error.message || 'Something went wrong'
        })
    }
})

export const { setUser, logUserOut } = userSlice.actions
export const selectUserState = (state: RootState) => state.user  // SELECTOR
export default userSlice.reducer