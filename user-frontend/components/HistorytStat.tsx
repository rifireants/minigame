'use client';
import { useEffect, useState } from 'react';

interface Stat {
  totalCount: number;
  pendingCount: number;
  depositTotal: number;
  withdrawalTotal: number;
}

export default function HistorytStat() {
  const [stat, setStat] = useState<Stat | null>(null);

  useEffect(() => {
    const fetchTransactionStat = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStat(await res.json());
      } catch (err) {
        console.error("충환전 통계 조회 실패", err);
      }
    };

    fetchTransactionStat();
  }, []);

  if (!stat) return <div className="p-4 text-sm text-gray-500">통계 불러오는 중...</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 mb-3 text-sm font-semibold">나의 거래 통계</h6>

      {/* 메인 통계 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-blue-500 text-xl font-bold mb-1">{stat.totalCount}건</div>
          <div className="text-sm text-gray-700 font-medium">총 신청</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-yellow-500 text-xl font-bold mb-1">{stat.pendingCount}건</div>
          <div className="text-sm text-gray-700 font-medium">대기중</div>
        </div>
      </div>

      {/* 금액 통계 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-green-600 text-xl font-bold mb-1">{stat.depositTotal.toLocaleString()}원</div>
          <div className="text-sm text-gray-700 font-medium">총 충전</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="text-sky-500 text-xl font-bold mb-1">{stat.withdrawalTotal.toLocaleString()}원</div>
          <div className="text-sm text-gray-700 font-medium">총 출금</div>
        </div>
      </div>
    </div>
  );
}
