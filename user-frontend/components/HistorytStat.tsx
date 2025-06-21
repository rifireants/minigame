export default function HistorytStat() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 mb-3 text-sm font-semibold">나의 거래 통계</h6>

      {/* 메인 통계 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-blue-500 text-xl font-bold mb-1">9</div>
          <div className="text-sm text-gray-700 font-medium">총 신청</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-yellow-500 text-xl font-bold mb-1">0</div>
          <div className="text-sm text-gray-700 font-medium">대기중</div>
        </div>
      </div>

      {/* 금액 통계 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-green-600 text-xl font-bold mb-1">0원</div>
          <div className="text-sm text-gray-700 font-medium">총 충전</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-sky-500 text-xl font-bold mb-1">0원</div>
          <div className="text-sm text-gray-700 font-medium">총 출금</div>
        </div>
      </div>
    </div>
  );
}
