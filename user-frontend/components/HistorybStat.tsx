'use client';
import { useEffect, useState } from 'react';

interface Stat {
  totalCount: number;
  winCount: number;
  payouts: number;
}

export default function HistorytStat() {
  const [stat, setStat] = useState<Stat | null>(null);

  useEffect(() => {
    const fetchBetStat = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets/stat`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStat(await res.json());
      } catch (err) {
        console.error("베팅 통계 조회 실패", err);
      }
    };

    fetchBetStat();
  }, []);

  if (!stat) return <div className="p-4 text-sm text-gray-500">통계 불러오는 중...</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 text-sm font-semibold mb-3">나의 게임 통계</h6>

      {/* 메인 통계 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-blue-600 text-xl font-bold mb-1">{stat.totalCount || 0}</div>
          <div className="text-sm text-gray-700 font-medium">총 베팅</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-sky-500 text-xl font-bold mb-1">{stat.winCount || 0}</div>
          <div className="text-sm text-gray-700 font-medium">승리</div>
        </div>
      </div>

      {/* 수익 정보 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-green-600 text-xl font-bold mb-1">{stat.totalCount && stat.winCount ? stat.winCount * 100 / stat.totalCount : 0}%</div>
          <div className="text-sm text-gray-700 font-medium">승률</div>
        </div>
        <div className="text-center bg-gray-100 rounded-lg border p-4">
          <div className="text-xl font-bold mb-1">{stat.payouts || 0}원</div>
          <div className="text-sm text-gray-700 font-medium">수익</div>
        </div>
      </div>
    </div>
  );
}
