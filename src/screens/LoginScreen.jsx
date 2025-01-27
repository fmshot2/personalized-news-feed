import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/auth/authActions';
import { useEffect } from 'react';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // Redirect authenticated user to home screen
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className='min-h-screen  text-center'>   
   <div className="flex items-center justify-center align-items-center bg-gray-50 px-4 ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Don’t have an account?{' '}
          {!loading && (
            <Link to="/register" className="text-purple-600 hover:underline font-medium">
              Register here
            </Link>
          )}
        </p>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              disabled={loading}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              {...register('email')}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              disabled={loading}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              {...register('password')}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
        {!loading &&

          <Link
            to="/forgot-password"
            disabled={loading}
            className="text-sm text-purple-600 hover:underline font-medium"
          >
            Forgot your password?
          </Link>
}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginScreen;
