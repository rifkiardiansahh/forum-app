import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewComment } from '../../store/thunks/threadThunks';

const CommentForm = ({ threadId }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    await dispatch(createNewComment({ threadId, content }));
    setContent('');
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <p className='text-sm text-gray-500 italic'>
        Login untuk memberikan komentar.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='mt-4'>
      <div className='flex gap-2'>
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Tulis komentar...'
          className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
          required
          disabled={loading}
        />
        <button
          type='submit'
          disabled={loading || !content.trim()}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm disabled:opacity-50'
        >
          {loading ? '...' : 'Kirim'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
