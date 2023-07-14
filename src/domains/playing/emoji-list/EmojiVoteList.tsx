'use client';

// FIX: 서버로부터 emoji 불러오기
const emojis = [
  { id: 'rabbit', icon: '🐰', voteAmount: 12 },
  { id: 'lovely', icon: '🥰', voteAmount: 10 },
  { id: 'cupid', icon: '💘', voteAmount: 8 },
  { id: 'sleepy', icon: '😴', voteAmount: 7 },
  { id: 'curious', icon: '🤔', voteAmount: 5 },
  { id: 'sad', icon: '🥲', voteAmount: 2 },
];

const EmojiVoteList = () => {
  return (
    <div className="max-w-[296px] flex gap-5 px-5 pt-3.5 pb-2.5 bg-gray-900 border border-gray-800 border-solid rounded-lg mx-auto">
      {emojis.map(({ id, icon, voteAmount }) => (
        <div className="flex flex-col w-[26px] gap-y-1" key={id}>
          <div className="mx-auto w-[26px] h-[26px] text-center">{icon}</div>
          <p className="text-caption mx-auto text-white">
            {String(voteAmount).padStart(2, '0')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmojiVoteList;
