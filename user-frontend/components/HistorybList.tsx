'use client'
import { useState, useEffect } from 'react';
import Dice from "./Dice";

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

export default function HistorytList() {
  const [bets, setBets] = useState<BetItem[]>([]);

  const translateBetType = (betType: string) => {
    const map: Record<string, string> = {
      low: '소',
      high: '대',
      odd: '홀',
      even: '짝',
    };
    return betType
      .split(',')
      .map((part) => map[part.trim()] || part)
      .join(' ');
  };

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBets(await res.json());
      } catch (err) {
        console.error("베팅 내역 조회 실패", err);
      }
    };

    fetchBets();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="p-5 space-y-6">
        {bets.map((item, idx) => (
          <div key={idx} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">{item.round.round}회차</span>
                <span className="text-gray-500 text-xs">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded text-white ${item.result === "승리" ? "bg-green-600" : "bg-red-600"
                  }`}
              >
                {item.result}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center scale-50">
                <div key={"dice1"} className="scale-75">
                  <Dice face={item.round.dice1} />
                </div>
                <div key={"dice2"} className="scale-75">
                  <Dice face={item.round.dice2} />
                </div>
                <div key={"dice3"} className="scale-75">
                  <Dice face={item.round.dice3} />
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                {item.round.sum}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="flex gap-3">
                <span>
                  내 베팅: <strong>{translateBetType(item.betType)}</strong>
                </span>
                <span className="text-blue-600 font-bold">{item.amount}</span>
              </div>
              {item.payout && (
                <div className="text-green-600 font-bold">당첨: {item.payout}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
