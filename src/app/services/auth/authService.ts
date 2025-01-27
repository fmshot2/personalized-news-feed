import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'

// const baseUrl = 'http://personalNewsAggregrator.test/api/v1/user/register'
const baseUrl = 'http://localhost:9900/api/v1/user/register'

interface UserDetails {
  id: number
  name: string
  email: string
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query<UserDetails, void>({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
})

// Export React hooks
export const { useGetUserDetailsQuery } = authApi
