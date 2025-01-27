import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import { registerUser } from '../features/auth/authActions'

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to home screen
    if (userInfo) navigate('/')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()

    dispatch(registerUser(data))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
          <div className='mb-4'>
            <label htmlFor='firstName' className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type='text'
              id='firstName'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              {...register('firstName')}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type='email'
              id='email'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              {...register('email')}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type='password'
              id='password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              {...register('password')}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword' className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
              {...register('confirmPassword')}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterScreen
