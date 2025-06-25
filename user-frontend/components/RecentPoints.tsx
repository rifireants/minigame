// components/RecentPointsSection.tsx
import React, { useEffect, useState } from 'react';
import { BsCoin } from "react-icons/bs";

const recentPoints = [
  { description: '베팅금액 수정 (추가 차감)', time: '06/18 01:29', amount: 9000, status: 'negative' },
  { description: '베팅금액 수정에 따른 당첨금 조정', time: '06/18 01:29', amount: 36000, status: 'positive' },
  { description: '1428회차 당첨 (자동정산)', time: '06/18 01:18', amount: 4000, status: 'positive' },
  { description: '주사위게임 베팅 (1428회차)', time: '06/18 01:17', amount: 1000, status: 'negative' },
  { description: '2025-06-18 첫로그인', time: '06/18 00:02', amount: 100, status: 'positive' },
];

interface PointItem {
  id: number;
  userId: number;
  type: 'increase' | 'decrease';
  amount: number;
  reason: string;
  createdAt: string;
}

export default function RecentPointsSection() {
  const [history, setHistory] = useState<PointItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/points`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(await res.json());
      } catch (err) {
        console.error("최근 포인트 내역 조회 실패", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-5 border-t border-[#f1f3f4]">
      <h3 className="text-lg font-bold text-[#333] mb-4 flex items-center gap-3">
        <BsCoin className="text-xl" />최근 포인트 내역
      </h3>
      {history && (
        <div className="space-y-4">
          {history.map((point, index) => (
            <div key={index} className="flex items-center justify-between p-4 border-b border-[#f1f3f4]">
              <div>
                <div className="font-semibold text-[#495057]">{point.reason}</div>
                <div className="text-sm text-[#6c757d]">{new Date(point.createdAt).toLocaleString()}</div>
              </div>
              <div className={`font-semibold text-${point.type === 'increase' ? 'green-500' : 'red-500'}`}>
                {point.type === 'increase' ? `+${point.amount.toLocaleString()}P` : `-${point.amount.toLocaleString()}P`}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        <a href="/point" className="text-[#ff4757] font-semibold text-sm">
          전체 포인트 내역 보기
        </a>
      </div>
    </div>
  );
}
