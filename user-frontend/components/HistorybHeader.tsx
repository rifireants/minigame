import { BsClockHistory, BsArrowLeft } from 'react-icons/bs';
import Link from "next/link";
export default function HistorytHeader() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BsClockHistory className="text-blue-600 w-6 h-6" />
          <h4 className="text-lg font-bold m-0">베팅 히스토리</h4>
        </div>
        <Link
          href="/game"
          className="inline-flex items-center gap-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition"
        >
          <BsArrowLeft size={16} />
          <span>게임으로</span>
        </Link>
      </div>
    </div>
  );
}
