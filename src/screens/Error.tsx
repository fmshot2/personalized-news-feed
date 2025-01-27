import { useRouteError } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Headers from '../components/Headers';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  // if (error?.status === 500) {
  
  //   // message = error.data.message

  //   console.log('eroorpagemessage in 500', message);

  // }

  // if (error?.status === 404) {
  //   title = 'Not found!';
  //   message = 'Could not find resource or page.';
  //   console.log('eroorpagemessagein 404', message);
  // }


  return (
    <div className="flex flex-col lg:flex-row bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-4 lg:p-8 overflow-auto">
      <Headers />
      <Outlet />
    </main>
  </div>
  );
}

export default ErrorPage;
