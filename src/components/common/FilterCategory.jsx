import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/slices/filterSlice';

const FilterCategory = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.filter.category);
  const threads = useSelector((state) => state.threads.threads);

  // Ambil kategori unik dari thread
  const categories = threads
    .map((t) => t.category)
    .filter((cat) => cat && cat.trim() !== '')
    .reduce((acc, cat) => {
      const lower = cat.toLowerCase();
      if (!acc.some((c) => c.toLowerCase() === lower)) {
        acc.push(cat);
      }
      return acc;
    }, [])
    .sort((a, b) => a.localeCompare(b));

  const categoryOptions = ['all', ...categories];

  if (categories.length === 0) return null;

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <span className='text-sm text-gray-500 mr-1'>Filter:</span>
      {categoryOptions.map((cat) => (
        <button
          key={cat}
          onClick={() => dispatch(setCategory(cat))}
          className={`px-3 py-1 text-sm rounded-full transition ${
            currentCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat === 'all' ? 'Semua' : cat}
        </button>
      ))}
    </div>
  );
};

export default FilterCategory;
