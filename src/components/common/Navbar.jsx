import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/thunks/authThunks';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='bg-white shadow-md px-4 py-3 flex items-center justify-between'>
      <Link to='/' className='text-xl font-bold text-blue-600'>
        Forum Diskusi
      </Link>

      <div className='flex items-center gap-4'>
        {isAuthenticated
          ? (
          <>
            <Link
              to='/create'
              className='text-sm text-blue-600 hover:underline'
            >
              + Buat Thread
            </Link>
            <Link
              to='/leaderboard'
              className='text-sm text-gray-700 hover:underline'
            >
              Leaderboard
            </Link>
            <span className='text-sm text-gray-700'>
              👤 {user?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className='text-sm text-red-500 hover:underline'
            >
              Logout
            </button>
          </>
            )
          : (
          <>
            <Link to='/login' className='text-sm text-gray-700 hover:underline'>
              Login
            </Link>
            <Link
              to='/register'
              className='text-sm text-blue-600 hover:underline'
            >
              Daftar
            </Link>
          </>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
