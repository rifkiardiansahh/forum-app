import { useSelector, useDispatch } from 'react-redux';
import { formatDate, getAvatarUrl } from '../../utils/helper';
import { voteThread, voteComment } from '../../store/thunks/threadThunks';
import CommentForm from './CommentForm';

const ThreadDetail = ({ thread }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  if (!thread) return null;

  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
    comments = [],
  } = thread;

  const ownerName = owner?.name || 'User';
  const ownerAvatar = owner?.avatar || getAvatarUrl(ownerName);

  const handleVoteThread = (type) => {
    if (!userId) {
      alert('Silakan login untuk vote.');
      return;
    }
    let voteType;
    if (type === 'up') {
      voteType = upVotesBy.includes(userId) ? 0 : 1;
    } else {
      voteType = downVotesBy.includes(userId) ? 0 : -1;
    }
    dispatch(voteThread({ threadId: id, voteType }));
  };

  const isThreadUpvoted = upVotesBy.includes(userId);
  const isThreadDownvoted = downVotesBy.includes(userId);

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      {/* Header thread */}
      <div className='flex items-start gap-3 mb-4'>
        <img
          src={ownerAvatar}
          alt={ownerName}
          className='w-12 h-12 rounded-full object-cover'
          onError={(e) => {
            e.target.src = getAvatarUrl(ownerName);
          }}
        />
        <div>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <div className='flex items-center gap-2 text-sm text-gray-500 mt-1 flex-wrap'>
            <span>oleh {ownerName}</span>
            <span>•</span>
            <span>{formatDate(createdAt)}</span>
            {category && (
              <>
                <span>•</span>
                <span className='bg-gray-100 px-2 py-0.5 rounded-full text-xs'>
                  {category}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className='prose max-w-none mb-4 text-gray-700'
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* Vote thread */}
      <div className='flex items-center gap-3 mb-6'>
        <button
          onClick={() => handleVoteThread('up')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            isThreadUpvoted
              ? 'bg-green-100 border border-green-500 text-green-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          👍 {upVotesBy.length}
        </button>
        <button
          onClick={() => handleVoteThread('down')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            isThreadDownvoted
              ? 'bg-red-100 border border-red-500 text-red-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          👎 {downVotesBy.length}
        </button>
      </div>

      {/* Komentar */}
      <div className='border-t pt-4'>
        <h3 className='text-lg font-semibold mb-4'>
          💬 Komentar ({comments.length})
        </h3>
        <CommentForm threadId={id} />
        <div className='space-y-3 mt-4'>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} threadId={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== Komponen untuk satu komentar =====
const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const {
    id,
    content,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
  } = comment;
  const ownerName = owner?.name || 'User';
  const ownerAvatar = owner?.avatar || getAvatarUrl(ownerName);

  const handleVoteComment = (type) => {
    if (!userId) {
      alert('Silakan login untuk vote.');
      return;
    }
    let voteType;
    if (type === 'up') {
      voteType = upVotesBy.includes(userId) ? 0 : 1;
    } else {
      voteType = downVotesBy.includes(userId) ? 0 : -1;
    }
    dispatch(voteComment({ threadId, commentId: id, voteType }));
  };

  const isUpvoted = upVotesBy.includes(userId);
  const isDownvoted = downVotesBy.includes(userId);

  return (
    <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
      <div className='flex items-start gap-3'>
        <img
          src={ownerAvatar}
          alt={ownerName}
          className='w-8 h-8 rounded-full object-cover'
          onError={(e) => {
            e.target.src = getAvatarUrl(ownerName);
          }}
        />
        <div className='flex-1'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='font-medium'>{ownerName}</span>
            <span className='text-gray-400'>•</span>
            <span className='text-gray-400 text-xs'>
              {formatDate(createdAt)}
            </span>
          </div>
          <p className='text-gray-700 mt-1'>{content}</p>
          {/* Vote komentar */}
          <div className='flex items-center gap-3 mt-1'>
            <button
              onClick={() => handleVoteComment('up')}
              className={`px-2 py-0.5 rounded-full text-xs transition ${
                isUpvoted
                  ? 'bg-green-100 border border-green-500 text-green-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              👍 {upVotesBy.length}
            </button>
            <button
              onClick={() => handleVoteComment('down')}
              className={`px-2 py-0.5 rounded-full text-xs transition ${
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

export default ThreadDetail;
