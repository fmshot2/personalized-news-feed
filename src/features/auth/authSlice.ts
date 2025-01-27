import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

// Types for state
interface AuthState {
  loading: boolean
  userInfo: AuthResponse | null
  userToken: string | null
  error: string | null
  success: boolean
}

interface AuthResponse {
  status: string
  message: string
  data: {
    auth_token: string
  }
  timestamp: string
}

const userInfoRaw = localStorage.getItem('userInfo')

let userInfo = null
try {
  userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null
} catch (error) {
  userInfo = null
}

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken: userInfo?.data.auth_token || null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false
        state.userInfo = action.payload
        state.userToken = action.payload.data.auth_token
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
      })
      .addCase(userLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload || 'Login failed'
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false
        state.success = true
        state.userInfo = action.payload
        state.userToken = action.payload.data.auth_token
        
        try {
          localStorage.setItem('userInfo', JSON.stringify(action.payload))
          
          // Verify the save
          const savedData = localStorage.getItem('userInfo')
        } catch (error) {
        }
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload || 'Registration failed'
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer