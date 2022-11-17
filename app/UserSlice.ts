import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../infrastructure/services/firebase";
import { getSingleUserFirebase, getSingleCounselorFirebase, saveUserFirebase, logout } from "../infrastructure/services/firebase/User";
import { RootState } from "./store"

export const loginGoogle = createAsyncThunk('user/loginGoogle', async () => {
    const res = await signInWithPopup(auth, googleAuthProvider)
    const isUserExist = await getSingleUserFirebase(res.user.email || '')
    return { res, isUserExist }
})

export const checkUserExistance = createAsyncThunk('user/checkUserExistance', async (email: string) => {
    return await getSingleUserFirebase(email)
})

export const saveUser = createAsyncThunk('user/saveUser', async (theUser: UserInputType) => {
    return await saveUserFirebase(theUser)
})

export const loginGoogleAsCounselor = createAsyncThunk('user/loginGoogleAsCounselor', async () => {
    const res = await signInWithPopup(auth, googleAuthProvider)
    const isCounselorExist = await getSingleCounselorFirebase(res.user.email || '')
    return { res, isCounselorExist }
})

export const logOut = createAsyncThunk('user/logOut', async () => { return await logout() })

const initState: UserSliceType = {
    isLoggedIn: false,
    isExist: false,
    userInfo: { token: '', email: '', name: '', photoUrl: '', },
    isLoading: false,
    errorMessage: '',
    patientEmail: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
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
            state.isExist = false
            state.isLoggedIn = false
            state.userInfo = { token: '', email: '', name: '', photoUrl: '', }
        },
    },
    extraReducers: builder => {
        // LOGIN GOOGLE
        builder.addCase(loginGoogle.pending, state => {
            state.isLoading = true
            state.errorMessage = ''
        })
        builder.addCase(loginGoogle.fulfilled, (state, action: any) => {
            console.log(action.payload.isUserExist)
            if (!action.payload.isUserExist) {
                state.isExist = !action.payload.isUserExist
            }
            state.isLoggedIn = true
            state.isLoading = false
            state.userInfo = {
                token: action.payload.res.user.accessToken,
                email: action.payload.res.user.email,
                name: action.payload.res.user.displayName,
                photoUrl: action.payload.res.user.photoURL,
            }
            localStorage.setItem('user', JSON.stringify(state.userInfo));
            localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
            localStorage.setItem('isExist', JSON.stringify(!action.payload.isUserExist));
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
        // SAVE USER
        builder.addCase(saveUser.pending, state => {
            state.isLoading = true
            state.errorMessage = ''
        })
        builder.addCase(saveUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isExist = true
            localStorage.setItem('isExist', JSON.stringify(true));
        })
        builder.addCase(saveUser.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || 'Something went wrong'
        })
        // LOGIN GOOGLE AS COUNSELOR
        builder.addCase(loginGoogleAsCounselor.pending, state => {
            state.isLoading = true
            state.errorMessage = ''
        })
        builder.addCase(loginGoogleAsCounselor.fulfilled, (state, action: any) => {
            if (!action.payload.isCounselorExist) {
                state.isExist = !action.payload.isCounselorExist
            } else {
                state.errorMessage = 'Sorry, You Are Not Registered'
            }
            state.isLoggedIn = true
            state.isLoading = false
            state.userInfo = {
                token: action.payload.res.user.accessToken,
                email: action.payload.res.user.email,
                name: action.payload.res.user.displayName,
                photoUrl: action.payload.res.user.photoURL,
            }
            localStorage.setItem('user', JSON.stringify(state.userInfo));
            localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
            localStorage.setItem('isExist', JSON.stringify(!action.payload.isCounselorExist));
        })
        builder.addCase(loginGoogleAsCounselor.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || 'Something went wrong'
        })
        // LOGOUT
        builder.addCase(logOut.pending, state => { state.isLoading = true; state.errorMessage = '' })
        builder.addCase(logOut.fulfilled, (state, action: any) => {
            state.isLoading = false
            state.isLoggedIn = false
            state.isExist = false
            state.userInfo = { token: '', email: '', name: '', photoUrl: '', }
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isExist');
        })
        builder.addCase(logOut.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || 'Something went wrong'
        })
    }
})

export const { getUserFromLS, setUser, logUserOut } = userSlice.actions
export const selectUserState = (state: RootState) => state.user  // SELECTOR
export default userSlice.reducer