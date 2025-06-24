'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BsCurrencyDollar, BsPlayCircle } from "react-icons/bs";
import { toast } from 'sonner';

export default function GameBetting({ userData, roundData, onRefreshUser, isBettingClosed }: {
  userData: any,
  roundData: any,
  onRefreshUser: () => void,
  isBettingClosed: boolean
}) {
  const [selectedHighLow, setSelectedHighLow] = useState<string | null>(null);
  const [selectedOddEven, setSelectedOddEven] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const toggleHighLow = (value: string) => {
    setSelectedHighLow(prev => (prev === value ? null : value));
  };

  const toggleOddEven = (value: string) => {
    setSelectedOddEven(prev => (prev === value ? null : value));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const betTypes = [];
    if (selectedHighLow) betTypes.push(selectedHighLow);
    if (selectedOddEven) betTypes.push(selectedOddEven);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userData.userid,
        roundId: roundData.roundid,
        amount,
        betType: betTypes.join(','),
      }),
    });

    if (!response.ok) {
      throw new Error('서버 오류가 발생했습니다.');
    }

    const result = await response.json();
    if (result.success)
      toast.success(result.message);
    else
      toast.error(result.message);
    setSelectedHighLow(null);
    setSelectedOddEven(null);
    setAmount(0);
    onRefreshUser();
  };

  const isValid = (!!selectedHighLow || !!selectedOddEven) && amount >= 10000;

  return (
    <form
      id="bettingForm"
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) handleSubmit();
      }}
    >
      <div className="card bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
        <div className="card-body p-6">
          <h6 className="text-gray-500 mb-3">베팅 선택</h6>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              type="button"
              onClick={() => toggleHighLow("low")}
              className={`w-full py-3 rounded-lg border 
                ${selectedHighLow === "low"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"}`}
            >
              <div className="font-bold">소 (3-10)</div>
            </Button>
            <Button
              type="button"
              onClick={() => toggleHighLow("high")}
              className={`w-full py-3 rounded-lg border 
                ${selectedHighLow === "high"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"}`}
            >
              <div className="font-bold">대 (11-18)</div>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              type="button"
              onClick={() => toggleOddEven("odd")}
              className={`w-full py-3 rounded-lg border 
                ${selectedOddEven === "odd"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-green-500 border-green-500 hover:bg-green-500 hover:text-white"}`}
            >
              <div className="font-bold">홀</div>
            </Button>
            <Button
              type="button"
              onClick={() => toggleOddEven("even")}
              className={`w-full py-3 rounded-lg border 
                ${selectedOddEven === "even"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-green-500 border-green-500 hover:bg-green-500 hover:text-white"}`}
            >
              <div className="font-bold">짝</div>
            </Button>
          </div>
        </div>
      </div>

      <div className="card bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
        <div className="card-body p-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="form-label text-gray-500 font-bold">현재 선택</label>
              <p id="currentSelection" className="mb-0 font-bold text-blue-500">
                <span className="font-semibold text-blue-600">{selectedHighLow === "high" ? "대" : selectedHighLow === "low" ? "소" : ""}</span>
                {selectedHighLow && selectedOddEven && ", "}
                <span className="font-semibold text-green-600">{selectedOddEven === "odd" ? "홀" : selectedOddEven === "even" ? "짝" : ""}</span>
                {!selectedHighLow && !selectedOddEven && "없음"}
              </p>
            </div>
            <div>
              <label className="form-label text-gray-500 font-bold">보유머니</label>
              <p id="userMoney" className="mb-0 font-bold text-green-500">{userData ? userData.point.toLocaleString() + 'P' : '로딩중...'}</p>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-gray-500 font-bold">베팅금액</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                <BsCurrencyDollar className="text-xl" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={handleChange}
                className="form-control pl-10 py-3 border-2 border-gray-300 rounded-lg w-full"
                id="betAmount"
                placeholder="베팅할 포인트를 입력하세요"
                min="10000"
                max="100000000"
              />
            </div>
            <div className="text-sm text-[#6c757d]">최소: 10,000원, 최대: 100,000,000원</div>
          </div>
          <div className="mt-3 mb-3 p-3 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 font-semibold flex justify-between items-center">
            <span>합산금액</span>
            <span className="text-blue-600 text-base font-bold">
              {(amount * 2 * [selectedHighLow, selectedOddEven].filter(Boolean).length).toLocaleString()}원
            </span>
          </div>
          <Button
            type="submit"
            id="submitBet"
            disabled={!isValid || isBettingClosed}
            className="w-full py-3 text-black bg-yellow-500 rounded-lg flex items-center justify-center hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BsPlayCircle className="text-xl mr-2" />
            게임신청
          </Button>
        </div>
      </div>
    </form>
  );
}
