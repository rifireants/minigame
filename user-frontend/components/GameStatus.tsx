import { BsDice6 } from "react-icons/bs";

export default function GameStatus() {
  return (
    <div className="card round-info bg-[#2c3e50] text-white border-0 rounded-2xl shadow-2xl m-4">
      <div className="card-body p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BsDice6 className="text-3xl mr-3" />
            <div>
              <p className="mb-1 opacity-75">현재 진행중인 회차</p>
              <h5 className="mb-0 font-bold">1961회차</h5>
            </div>
          </div>
          <div className="text-right">
            <p className="mb-1 opacity-75">베팅 마감까지</p>
            <div className="text-4xl font-bold text-yellow-400" id="countdown">01:24</div>
            <small className="text-white opacity-50">13:15에 마감</small>
          </div>
        </div>

        {/* 게임 상태 표시 */}
        <div className="mt-2">
          <span className="badge bg-green-500 text-white px-2 py-1 rounded-full">베팅 가능</span>
          <small className="text-white opacity-50 ml-2">지금 베팅하세요!</small>

          {/* 디버깅용 시간 정보 (관리자만) */}
          <div className="mt-1">
            <small className="text-white opacity-50 text-sm">
              현재: 13:12:26 | 시작: 13:12:23 | 마감: 13:15:03 | 결과: 13:15:13
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
