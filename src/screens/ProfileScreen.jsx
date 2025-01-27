import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/profile.css';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  if (!userInfo) {
    return null;
  }

  const { first_name } = userInfo?.data.user;

  return (
    <div>
      <figure>{first_name.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{first_name}!</strong> You can view this page
        because you're logged in.
      </span>
    </div>
  );
};

export default ProfileScreen;
