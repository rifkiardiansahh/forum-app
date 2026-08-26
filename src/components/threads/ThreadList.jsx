import { useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';
import Loading from '../common/Loading';

const ThreadList = () => {
  const { threads, loading, error } = useSelector((state) => state.threads);
  const filterCategory = useSelector((state) => state.filter.category);

  const filteredThreads =
    filterCategory === 'all'
      ? threads
      : threads.filter(
        (t) => t.category?.toLowerCase() === filterCategory.toLowerCase(),
      );

  if (loading) {
    return <Loading text='Memuat thread...' />;
  }

  if (error) {
    return (
      <div className='text-center text-red-500 py-8'>
        <p>Gagal memuat thread: {error}</p>
      </div>
    );
  }

  if (filteredThreads.length === 0) {
    return (
      <div className='text-center text-gray-500 py-8'>
        <p>Belum ada thread. Buat thread pertama!</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {filteredThreads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;
