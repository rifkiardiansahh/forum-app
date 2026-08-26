import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from './store/thunks/authThunks';
import { fetchUsers } from './store/thunks/usersThunks';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import './styles/index.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getProfile());
    }
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main className='container mx-auto py-4'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/thread/:id' element={<ThreadDetailPage />} />
            <Route
              path='/create'
              element={
                <ProtectedRoute>
                  <CreateThreadPage />
                </ProtectedRoute>
              }
            />
            <Route path='/leaderboard' element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
