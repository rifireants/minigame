'use client'

import { useEffect, useState } from 'react'
import { BsDice6 } from "react-icons/bs";

export default function GameStatus({ roundData, fetchRound, isBettingClosed }: { 
  roundData: any, 
  fetchRound: () => void,
  isBettingClosed: boolean
}) {
  const [timeLeft, setTimeLeft] = useState<string>("--:--");
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [endTimeText, setEndTimeText] = useState<string>("");

  useEffect(() => {
    if (roundData) {
      const start = new Date(roundData.startTime);
      const end = new Date(roundData.endTime);
      setEndTime(end);
      setEndTimeText(end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [roundData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!endTime) return;
      const now = new Date();
      const diff = Math.max(0, endTime.getTime() - now.getTime());
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      if (diff === 0) {
        fetchRound(); // 새 회차 데이터 가져오기
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, fetchRound]);

  return (
    <div className="card round-info bg-[#2c3e50] text-white border-0 rounded-2xl shadow-2xl m-4">
      <div className="card-body p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BsDice6 className="text-3xl mr-3" />
            <div>
              <p className="mb-1 opacity-75">현재 진행중인 회차</p>
              <h5 className="mb-0 font-bold">{roundData ? `${roundData.round}회차` : "로딩중..."}</h5>
            </div>
          </div>
          <div className="text-right">
            <p className="mb-1 opacity-75">베팅 마감까지</p>
            <div className="text-4xl font-bold text-yellow-400" id="countdown">{timeLeft}</div>
            <small className="text-white opacity-50">{endTimeText}에 마감</small>
          </div>
        </div>

        {/* 게임 상태 표시 */}
        <div className="mt-2">
          {isBettingClosed ? (
            <>
              <span className="badge bg-gray-400 text-white px-2 py-1 rounded-full">베팅 마감</span>
              <small className="text-white opacity-50 ml-2">마감 10초 전에는 베팅할 수 없습니다.</small>
            </>
          ) : (
            <>
              <span className="badge bg-green-500 text-white px-2 py-1 rounded-full">베팅 가능</span>
              <small className="text-white opacity-50 ml-2">지금 베팅하세요!</small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
