import { redirect } from 'react-router-dom';


export function action() {
  
  localStorage.removeItem('userInfo');
  // store.dispatch(logout());
  return redirect('/login');
}