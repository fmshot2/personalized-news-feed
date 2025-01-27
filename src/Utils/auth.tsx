import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('userInfo');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}


export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    throw redirect('/login');

    // return redirect('/login');
    }
  // Return a valid value for authenticated users
  return null;
}