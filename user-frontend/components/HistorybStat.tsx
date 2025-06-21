export default function HistorytStat() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 text-sm font-semibold mb-3">나의 게임 통계</h6>

      {/* 메인 통계 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-blue-600 text-xl font-bold mb-1">8</div>
          <div className="text-sm text-gray-700 font-medium">참여회차</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-sky-500 text-xl font-bold mb-1">8</div>
          <div className="text-sm text-gray-700 font-medium">총 베팅</div>
        </div>
      </div>

      {/* 수익 정보 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-green-600 text-xl font-bold mb-1">7</div>
          <div className="text-sm text-gray-700 font-medium">승리</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-xl font-bold mb-1">87.5%</div>
          <div className="text-sm text-gray-700 font-medium">승률</div>
        </div>
      </div>

      {/* 수익 */}
      <div className="text-center bg-gray-100 rounded-lg border p-4">
        <div className="text-green-600 text-xl font-bold mb-1">4,229,600P</div>
        <div className="text-sm text-gray-700 font-medium">수익</div>
      </div>
    </div>
  );
}
