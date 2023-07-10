import BasicButton from '@/components/button/BasicButton';

const EmojiVoteNotice = () => {
  return (
    <div className="w-[440px] bg-gray-900 rounded-t-lg px-4 py-[22px] flex justify-between mx-auto">
      <div className="flex flex-col">
        <h4 className="text-h4 text-white">이 음악에 어울리는 이모지는?</h4>
        <p className="text-body3 text-white">
          지금 듣고있는 음악을 표현할 이모지에 투표하세요!
        </p>
      </div>
      <BasicButton size="sm">
        <p className="text-body3">투표하기</p>
      </BasicButton>
    </div>
  );
};

export default EmojiVoteNotice;
