'use client';

// FIX: 서버로부터 emoji 불러오기
const emojis = [
    { id: 'rabbit', icon: '🐰', voteAmount: 0 },
    { id: 'lovely', icon: '🥰', voteAmount: 0 },
    { id: 'cupid', icon: '💘', voteAmount: 0 },
    { id: 'sleepy', icon: '😴', voteAmount: 0 },
    { id: 'curious', icon: '🤔', voteAmount: 0 },
    { id: 'sad', icon: '🥲', voteAmount: 0 },
  ];

const EmojiVoteList = () => {
    return (
        <div className="max-w-[296px] flex gap-5 px-5 pt-3.5 pb-2.5 bg-gray900 border border-gray800 border-solid">
            {emojis.map(({id, icon, voteAmount}) => (
                <div className="flex flex-col w-[26px] gap-y-1" key={id}>
                    <div>{icon}</div>
                    <p className="text-caption mx-auto text-white">{voteAmount}</p>
                </div>))}
        </div>
    )
}

export default EmojiVoteList;