import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/thunks/authThunks';
import { clearError } from '../../store/slices/authSlice';
const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await dispatch(register({ name, email, password }));
    if (register.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  if (success) {
    return (
      <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center'>
        <div className='text-green-600 text-4xl mb-4'>✅</div>
        <h3 className='text-xl font-bold'>Pendaftaran Berhasil!</h3>
        <p className='text-gray-600 mt-2'>Silakan masuk ke akun Anda.</p>
        <Link
          to='/login'
          className='text-blue-600 hover:underline mt-4 inline-block'
        >
          Ke halaman Login →
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-6'>Daftar Akun</h2>
      {error && (
        <div className='bg-red-100 text-red-700 p-3 rounded mb-4 text-sm'>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Nama Lengkap
          </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Password (min. 6 karakter)
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
            minLength={6}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50'
        >
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-4'>
        Sudah punya akun?{' '}
        <Link to='/login' className='text-blue-600 hover:underline'>
          Login di sini
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
