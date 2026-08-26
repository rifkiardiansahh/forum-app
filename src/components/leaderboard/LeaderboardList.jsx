import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from '../../store/thunks/leaderboardThunks';
import Loading from '../common/Loading';
import { getAvatarUrl } from '../../utils/helper';

const LeaderboardList = () => {
  const dispatch = useDispatch();
  const { leaderboards, loading, error } = useSelector(
    (state) => state.leaderboard,
  );

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (loading) {
    return <Loading text='Memuat leaderboard...' />;
  }

  if (error) {
    return (
      <div className='text-center text-red-500 py-8'>
        <p>Gagal memuat leaderboard: {error}</p>
      </div>
    );
  }

  if (leaderboards.length === 0) {
    return (
      <div className='text-center text-gray-500 py-8'>
        <p>Belum ada data leaderboard.</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <div className='bg-blue-600 text-white px-6 py-4'>
        <h2 className='text-xl font-bold'>🏆 Leaderboard</h2>
      </div>
      <ul className='divide-y divide-gray-200'>
        {leaderboards.map((item, index) => {
          const { user, score } = item;
          const avatar = user.avatar || getAvatarUrl(user.name);

          return (
            <li
              key={user.id}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition ${
                index === 0 ? 'bg-yellow-50' : ''
              }`}
            >
              <span className='text-2xl font-bold text-gray-400 w-8 text-center'>
                #{index + 1}
              </span>
              <img
                src={avatar}
                alt={user.name}
                className='w-12 h-12 rounded-full object-cover'
                onError={(e) => {
                  e.target.src = getAvatarUrl(user.name);
                }}
              />
              <div className='flex-1'>
                <p className='font-medium'>{user.name}</p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </div>
              <div className='text-right'>
                <span className='text-2xl font-bold text-blue-600'>
                  {score}
                </span>
                <p className='text-xs text-gray-400'>poin</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaderboardList;
