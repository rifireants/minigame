'use client'

import { useEffect, useState } from 'react';
import GameStatus from "../../components/GameStatus";
import GameResult from "../../components/GameResult";
import GameBetting from "../../components/GameBetting";
import GameNav from "../../components/GameNav";
import QuickNav from "../../components/QuickNav";

export default function GamePage() {
  const [roundData, setRoundData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isBettingClosed, setIsBettingClosed] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUserData(data);
    }
  };

  const fetchRound = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/rounds/current', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setRoundData(data);

      if (data.status === 'ended') {
        fetchUser();
      }
    }
  };

  useEffect(() => {
    // 게임 데이터 및 유저 정보를 fetch하여 상태에 저장
    const fetchData = async () => {
      try {
        fetchUser();
        fetchRound();
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!roundData?.endTime) return;

    const end = new Date(roundData.endTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = end - now;

      setIsBettingClosed(remaining <= 10000);
    }, 1000);

    return () => clearInterval(interval);
  }, [roundData]);

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <GameStatus roundData={roundData} fetchRound={fetchRound} isBettingClosed={isBettingClosed} />
      <GameResult />
      <GameBetting userData={userData} roundData={roundData} onRefreshUser={fetchUser} isBettingClosed={isBettingClosed} />
      <GameNav />
      <QuickNav />
    </main>
  );
}
