const VinylRecordList = () => {
  return (
    <>
      <p className="text-center w-100 text-white text-caption mt-[9px]">{`-2:27`}</p>
      <div className="w-[1060px] -translate-x-[290px] flex gap-x-5 justify-center m-auto items-center">
        <VinylRecord />
        <div className="min-w-[360px] h-[360px] rounded-full bg-white/30 flex flex-col justify-center m-auto items-center">
          <div className="min-w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#1853FF] to-[#18FF59] flex flex-col justify-center m-auto items-center">
            <div className="w-[357px] h-[357px] rounded-full bg-black flex flex-col justify-center m-auto items-center">
              <VinylRecord />
            </div>
          </div>
        </div>
        <VinylRecord />
      </div>
    </>
  );
};

const VinylRecord = () => {
  return (
    <div className="w-[340px] h-[340px] rounded-full bg-white flex flex-col justify-center m-auto items-center">
      <div className="w-[100px] h-[100px] rounded-full bg-black m-auto"></div>
    </div>
  );
};

export default VinylRecordList;
