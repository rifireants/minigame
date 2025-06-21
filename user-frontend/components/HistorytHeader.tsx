import { BsClockHistory } from 'react-icons/bs';

export default function HistorytHeader() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl flex items-center">
          <BsClockHistory className="text-blue-500 mr-2 text-2xl" />
          <h4 className="mb-0 font-bold">충전/출금 내역</h4>
        </div>
        <div className="text-right">
          <small className="text-gray-500">현재 포인트</small>
          <div className="text-2xl text-primary font-semibold text-lg">172,100P</div>
        </div>
      </div>
    </div>
  );
}
