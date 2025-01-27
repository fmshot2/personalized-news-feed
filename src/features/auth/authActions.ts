import axios from 'axios'
import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit'

// Types for the login and register request payloads
interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  email: string
  password: string
}

interface UserResponse {
  status: string
  message: string
  data: {
    auth_token: string
  }
  timestamp: string
}

const backendURL = 'http://localhost:9900/api/v1/user'

// userLogin async action
export const userLogin = createAsyncThunk<
  UserResponse,
  LoginPayload,
  { rejectValue: string | SerializedError } // Rejected action payload type
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post<UserResponse>(
        `${backendURL}/login`,
        { email, password },
        config
      )

      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

// registerUser async action
export const registerUser = createAsyncThunk<
  UserResponse, // Return type: UserResponse
  RegisterPayload, // Argument type
  { rejectValue: string | SerializedError } // Rejected action payload type
>(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post<UserResponse>(
        `${backendURL}/register`,
        { email, password },
        config
      )

      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

