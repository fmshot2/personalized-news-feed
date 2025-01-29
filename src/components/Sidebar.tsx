import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50">
      <aside className="bg-white border-r border-gray-200 p-4 lg:w-64">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <span className="text-xl font-bold">DAILY</span>
          <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {/* Home Link */}
          <div className="px-4 py-2">
            <Link to="/" className="flex items-center px-4 py-2 text-purple-700 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </div>

          {/* Conditional Links */}
          {userInfo ? (
            <>
              {/* Logout Button */}
              <div className="px-4 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-purple-700 bg-purple-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Logout
                </button>
              </div>

              {/* Edit Preferences */}
              <div className="px-4 py-2">
                <Link
                  to="/user-preferences"
                  className="flex items-center px-4 py-2 text-purple-700 bg-purple-100 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Edit Preferences
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-2">
              {/* Login Link */}
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-purple-700 bg-purple-100 rounded-lg"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Login
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
