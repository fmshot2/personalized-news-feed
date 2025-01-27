import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Headers from '../components/Headers';

function RootLayout() {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <Headers />
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;