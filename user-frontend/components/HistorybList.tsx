'use client'
import { useState } from 'react';
import Dice from "./Dice";

interface HistoryItem {
  round: string;
  date: string;
  result: string; // '승리' | '패배'
  dice: number[];
  resultText: string;
  myBet: string;
  amount: string;
  winAmount?: string;
}

const history: HistoryItem[] = [
  {
    round: "#1428",
    date: "06/18 01:17",
    result: "승리",
    dice: [6, 4, 6],
    resultText: "16 대 짝",
    myBet: "대 짝",
    amount: "10,000P",
    winAmount: "40,000P",
  },
  {
    round: "#1359",
    date: "06/17 21:56",
    result: "패배",
    dice: [3, 1, 6],
    resultText: "10 소 짝",
    myBet: "소 홀",
    amount: "1,000P",
  },
  // ... 생략: 동일 형식으로 나머지도 추가 가능
];

export default function HistorytList() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="p-5 space-y-6">
        {history.map((item, idx) => (
          <div key={idx} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">{item.round}</span>
                <span className="text-gray-500 text-xs">{item.date}</span>
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
                {item.dice.map((num, i) => (
                  <div key={i} className="scale-75">
                    <Dice face={num} />
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-gray-700">
                {item.resultText}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="flex gap-3">
                <span>
                  내 베팅: <strong>{item.myBet}</strong>
                </span>
                <span className="text-blue-600 font-bold">{item.amount}</span>
              </div>
              {item.winAmount && (
                <div className="text-green-600 font-bold">당첨: {item.winAmount}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
