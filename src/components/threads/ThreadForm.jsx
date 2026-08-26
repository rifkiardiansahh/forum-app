import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewThread } from '../../store/thunks/threadThunks';

const ThreadForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    const result = await dispatch(createNewThread({ title, body, category }));
    setLoading(false);

    if (createNewThread.fulfilled.match(result)) {
      navigate(`/thread/${result.payload.id}`);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Buat Thread Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Judul
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Kategori
          </label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='General'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Isi Thread
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50'
        >
          {loading ? 'Memposting...' : 'Posting Thread'}
        </button>
      </form>
    </div>
  );
};

export default ThreadForm;
