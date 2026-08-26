const Loading = ({ size = 'md', text = 'Memuat...' }) => {
  const sizeClass =
    {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    }[size] || 'w-8 h-8';

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div
        className={`${sizeClass} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
      />
      {text && <p className='mt-2 text-gray-600 text-sm'>{text}</p>}
    </div>
  );
};

export default Loading;
