import { BsClockHistory } from 'react-icons/bs';
import { BsHouse } from 'react-icons/bs';

export default function GameNav() {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      <div>
        <a href="/historyb" className="btn btn-outline-dark w-full py-3 border border-gray-500 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center">
          <BsClockHistory className="text-lg mr-2" />히스토리
        </a>
      </div>
      <div>
        <a href="/" className="btn btn-outline-dark w-full py-3 border border-gray-500 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center">
          <BsHouse className="text-lg mr-2" />홈으로
        </a>
      </div>
    </div>
  );
}
