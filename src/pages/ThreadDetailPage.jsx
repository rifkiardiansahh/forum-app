import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadDetail, voteThread } from '../store/thunks/threadThunks';
import { clearDetail } from '../store/slices/detailThreadSlice';
import ThreadDetail from '../components/threads/ThreadDetail';
import Loading from '../components/common/Loading';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thread, loading, error } = useSelector((state) => state.detailThread);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const handleVote = (threadId, voteType) => {
    dispatch(voteThread({ threadId, voteType }));
  };

  if (loading) {
    return <Loading text='Memuat detail thread...' />;
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-8 text-center'>
        <p className='text-red-500'>Gagal memuat thread: {error}</p>
        <button
          onClick={() => navigate('/')}
          className='mt-4 text-blue-600 hover:underline'
        >
          Kembali ke beranda
        </button>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-8 text-center'>
        <p className='text-gray-500'>Thread tidak ditemukan.</p>
        <button
          onClick={() => navigate('/')}
          className='mt-4 text-blue-600 hover:underline'
        >
          Kembali ke beranda
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      <ThreadDetail thread={thread} onVote={handleVote} />
    </div>
  );
};

export default ThreadDetailPage;
