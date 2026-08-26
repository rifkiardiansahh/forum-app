import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../store/thunks/threadThunks';
import ThreadList from '../components/threads/ThreadList';
import FilterCategory from '../components/common/FilterCategory';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (loading) {
    return <Loading text='Memuat thread...' />;
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>📋 Daftar Thread</h1>
        <FilterCategory />
      </div>
      <ThreadList />
    </div>
  );
};

export default HomePage;
