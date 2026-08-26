import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate, getAvatarUrl } from '../../utils/helper';
import { voteThread } from '../../store/thunks/threadThunks';

const ThreadItem = ({ thread }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  // Ambil data owner dari users slice
  const users = useSelector((state) => state.users.users);
  const owner = users.find((u) => u.id === thread.ownerId);
  const ownerName = owner?.name || 'User';
  const ownerAvatar = owner?.avatar || getAvatarUrl(ownerName);

  const {
    id,
    title,
    body,
    category,
    createdAt,
    totalComments,
    upVotesBy = [],
    downVotesBy = [],
  } = thread;

  // Handler vote dengan toggle
  const handleVote = (type) => {
    if (!userId) {
      alert('Silakan login untuk memberikan vote.');
      return;
    }

    let voteType;
    if (type === 'up') {
      // Jika sudah up, netralkan (0), selain itu up (1)
      voteType = upVotesBy.includes(userId) ? 0 : 1;
    } else {
      // Jika sudah down, netralkan (0), selain itu down (-1)
      voteType = downVotesBy.includes(userId) ? 0 : -1;
    }

    dispatch(voteThread({ threadId: id, voteType }));
  };

  const isUpvoted = upVotesBy.includes(userId);
  const isDownvoted = downVotesBy.includes(userId);

  return (
    <div className='bg-white rounded-lg shadow hover:shadow-md transition p-4 border border-gray-100'>
      <div className='flex items-start gap-3'>
        <img
          src={ownerAvatar}
          alt={ownerName}
          className='w-10 h-10 rounded-full object-cover flex-shrink-0'
          onError={(e) => {
            e.target.src = getAvatarUrl(ownerName);
          }}
        />
        <div className='flex-1 min-w-0'>
          <Link to={`/thread/${id}`}>
            <h3 className='text-lg font-semibold text-blue-600 hover:underline truncate'>
              {title}
            </h3>
          </Link>
          {body && (
            <p className='text-gray-600 text-sm mt-1 line-clamp-2'>
              {body.replace(/<[^>]*>/g, '').slice(0, 120)}
              {body.length > 120 ? '...' : ''}
            </p>
          )}
          <div className='flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap'>
            <span>oleh {ownerName}</span>
            <span>•</span>
            <span>{formatDate(createdAt)}</span>
            {category && (
              <>
                <span>•</span>
                <span className='bg-gray-100 px-2 py-0.5 rounded-full'>
                  {category}
                </span>
              </>
            )}
            <span>•</span>
            <span>💬 {totalComments || 0}</span>
          </div>

          {/* === VOTE BUTTONS === */}
          <div className='flex items-center gap-3 mt-2'>
            <button
              onClick={() => handleVote('up')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isUpvoted
                  ? 'bg-green-100 border border-green-500 text-green-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              👍 {upVotesBy.length}
            </button>
            <button
              onClick={() => handleVote('down')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isDownvoted
                  ? 'bg-red-100 border border-red-500 text-red-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              👎 {downVotesBy.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;
