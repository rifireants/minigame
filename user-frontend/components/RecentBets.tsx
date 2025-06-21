import React from 'react';
import { BsClockHistory } from "react-icons/bs";

const recentBets = [
  { description: '1428회차 대 짝', result: '당첨', time: '06/18 01:17', amount: 10000, status: 'success' },
  { description: '1359회차 소 홀', result: '실패', time: '06/17 21:56', amount: 1000, status: 'failure' },
  { description: '1350회차 소 짝', result: '당첨', time: '06/17 21:30', amount: 1000, status: 'success' },
];

const RecentBets = () => (
  <div className="p-5 border-t border-[#f1f3f4]">
    <h3 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-3">
      <BsClockHistory className="text-xl" />최근 베팅 내역
    </h3>
    <div className="space-y-4">
      {recentBets.map((bet, index) => (
        <div key={index} className="flex items-center justify-between p-4 border-b border-[#f1f3f4]">
          <div>
            <div className="font-semibold text-[#495057]">{bet.description}
              <span className={`text-white py-1 px-3 rounded-full text-sm ml-2 bg-${bet.status === 'success' ? 'green-500' : 'red-500'}`}>{bet.result}</span>
            </div>
            <div className="text-sm text-[#6c757d]">{bet.time}</div>
          </div>
          <div className={`font-semibold text-${bet.status === 'success' ? 'green-500' : 'red-500'}`}>
            {bet.status === 'success' ? `+${bet.amount}P` : `-${bet.amount}P`}
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-4">
      <a href="/history" className="text-[#ff4757] font-semibold text-sm">
        전체 베팅 내역 보기
      </a>
    </div>
  </div>
);

export default RecentBets;
