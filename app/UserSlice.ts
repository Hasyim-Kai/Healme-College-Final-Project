import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { onAuthStateChanged, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, googleAuthProvider } from "../infrastructure/services/firebase";
import { getSingleUserFirebase } from "../infrastructure/services/firebase/User";
import { RootState } from "./store"

export const loginGoogle = createAsyncThunk('user/loginGoogle', async () => {
    return await signInWithPopup(auth, googleAuthProvider)
})

export const checkUserExistance = createAsyncThunk('user/checkUserExistance', async (email: string) => {
    return await getSingleUserFirebase(email)
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        isExist: false,
        userInfo: {},
        isLoading: false,
        errorMessage: ''
    },
    reducers: {
        getUserFromLS(state) {
            state.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || `false`);
            state.isExist = JSON.parse(localStorage.getItem('isExist') || `false`);
            state.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        },
        setUser(state, action) {
            state.isLoggedIn = true
            state.userInfo = {
                token: action.payload.accessToken,
                email: action.payload.email,
                name: action.payload.displayName,
                photoUrl: action.payload.photoURL,
            }
        },
        logUserOut(state) {
            state.isLoggedIn = false
            state.userInfo = {}
        },
    },
    extraReducers: builder => {
        // LOGIN GOOGLE
        builder.addCase(loginGoogle.pending, state => {
            state.isLoading = true
            state.errorMessage = ''
        })
        builder.addCase(loginGoogle.fulfilled, (state, action) => {
            state.isLoggedIn = true
            state.isLoading = false
            state.userInfo = {
                token: action.payload.user.accessToken,
                email: action.payload.user.email,
                name: action.payload.user.displayName,
                photoUrl: action.payload.user.photoURL,
            }
            localStorage.setItem('user', JSON.stringify(state.userInfo));
            localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
        })
        builder.addCase(loginGoogle.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || 'Something went wrong'
        })
        // CHECK USER EXISTANCE
        builder.addCase(checkUserExistance.pending, state => {
            state.isLoading = true
            state.errorMessage = ''
        })
        builder.addCase(checkUserExistance.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.isExist = !action.payload
            localStorage.setItem('isExist', JSON.stringify(!action.payload));
        })
        builder.addCase(checkUserExistance.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || 'Something went wrong'
        })
    }
})

export const { getUserFromLS, setUser, logUserOut } = userSlice.actions
export const selectUserState = (state: RootState) => state.user  // SELECTOR
export default userSlice.reducer