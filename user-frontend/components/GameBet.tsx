import { Button } from "@/components/ui/button";
import { BsCurrencyDollar, BsPlayCircle } from "react-icons/bs";
import { } from 'react-icons/bs';

export default function GameBet() {
  return (
    <form id="bettingForm">
      <div className="card bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
        <div className="card-body p-6">

          {/* 현재 선택 표시 */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="form-label text-gray-500 font-bold">현재 선택</label>
              <p id="currentSelection" className="mb-0 font-bold text-blue-500">선택 안함</p>
            </div>
            <div>
              <label className="form-label text-gray-500 font-bold">보유머니</label>
              <p id="userMoney" className="mb-0 font-bold text-green-500">172,100P</p>
            </div>
          </div>

          {/* 베팅 금액 입력 */}
          <div className="mb-3">
            <label className="form-label text-gray-500 font-bold">베팅금액</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                <BsCurrencyDollar className="text-xl" />
              </div>
              <input
                type="number"
                className="form-control pl-10 py-3 border-2 border-gray-300 rounded-lg w-full"
                id="betAmount"
                placeholder="베팅할 포인트를 입력하세요"
                min="1000"
                max="172100"
              />
            </div>
            <small className="text-muted block mt-1">
              최소: 1,000P, 최대: 172,100P
            </small>
          </div>

          {/* 합산 금액 */}
          <div className="mb-3">
            <label className="form-label text-gray-500 font-bold">합산금액</label>
            <p id="totalBetAmount" className="h5 text-[#fd7e14] font-bold">0P</p>
          </div>

          {/* 히든 필드들 */}
          <input type="hidden" id="selectedHighLow" name="high_low" value="" />
          <input type="hidden" id="selectedOddEven" name="odd_even" value="" />
          <input type="hidden" id="roundId" name="round_id" value="7374" />
          <input type="hidden" id="roundNumber" name="round_number" value="1963" />

          {/* 베팅 버튼 */}
          <Button
            type="submit"
            id="submitBet"
            disabled
            className="w-full py-3 text-black bg-yellow-500 rounded-lg flex items-center justify-center hover:bg-yellow-600"
          >
            <BsPlayCircle className="text-xl mr-2" />
            게임신청
          </Button>
        </div>
      </div>
    </form>
  );
}
