import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../features/news/newsSlice'
import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/auth/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
