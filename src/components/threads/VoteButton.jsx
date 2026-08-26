const VoteButton = ({ threadId, voteType, isVoted, onVote }) => {
  const isUp = voteType === 'up';
  const label = isUp ? '👍' : '👎';
  const bgClass = isVoted
    ? isUp
      ? 'bg-green-100 border-green-500'
      : 'bg-red-100 border-red-500'
    : 'bg-gray-100 border-gray-300 hover:bg-gray-200';

  const handleClick = () => {
    onVote(threadId, isUp ? 1 : -1);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${bgClass}`}
      aria-label={isUp ? 'Upvote' : 'Downvote'}
    >
      {label}
    </button>
  );
};

export default VoteButton;
