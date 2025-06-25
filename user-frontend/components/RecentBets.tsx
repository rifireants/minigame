import React from 'react';
import { useState, useEffect } from "react";
import { BsClockHistory } from "react-icons/bs";

interface BetItem {
  id: number;
  amount: number;
  payout: number;
  betType: string;
  result: string;
  status: string;
  createdAt: string;
  round: {
    round: number;
    dice1: number;
    dice2: number;
    dice3: number;
    sum: number;
    startTime: string;
    endTime: string;
  };
}

export default function RecentBets() {
  const [history, setHistory] = useState<BetItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(await res.json());
      } catch (err) {
        console.error("최근 베팅 내역 조회 실패", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-5 border-t border-[#f1f3f4]">
      <h3 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-3">
        <BsClockHistory className="text-xl" />최근 베팅 내역
      </h3>
      {history.length > 0 && (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border-b border-[#f1f3f4]">
              <div>
                <div className="font-semibold text-[#495057]">{item.round.round}회차 {item.round.sum >= 11 ? "대" : "소"} {item.round.sum % 2 === 0 ? "짝" : "홀"}
                  <span className={`text-white py-1 px-3 rounded-full text-sm ml-2 bg-${item.result === 'win' ? 'green-500' : item.result === 'lose' ? 'red-500' : 'gray-500'}`}>{item.result === 'win' ? "당첨" : item.result === 'lose' ? "낙첨" : "대기중"}</span>
                </div>
                <div className="text-sm text-[#6c757d]">{new Date(item.createdAt).toLocaleString()}</div>
              </div>
              <div className={`font-semibold text-${item.result === 'win' ? 'green-500' : item.result === 'lose' ? 'red-500' : 'gray-500'}`}>
                {item.result === 'win' ? `+${item.payout.toLocaleString()}P` : item.result === 'lose' ? `-${item.payout.toLocaleString()}P` : ''}
              </div>
            </div>
          ))}
        </div>)
      }
      <div className="text-center mt-4">
        <a href="/historyb" className="text-[#ff4757] font-semibold text-sm">
          전체 베팅 내역 보기
        </a>
      </div>
    </div>
  );
}