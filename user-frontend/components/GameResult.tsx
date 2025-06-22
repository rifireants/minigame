'use client'

import { useEffect, useState } from 'react';
import Dice from "./Dice";
import { Button } from "@/components/ui/button";

export default function GameResult() {
  const [round, setRound] = useState<number | null>(null);
  const [dice, setDice] = useState<number[]>([]);
  const [sum, setSum] = useState<number | null>(null);

  useEffect(() => {
    const fetchLastRound = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/rounds/last", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRound(data.round);
        setDice([data.dice1, data.dice2, data.dice3]);
        setSum(data.sum);
      } catch (err) {
        console.error("이전 회차 결과 불러오기 실패:", err);
      }
    };

    fetchLastRound();
  }, []);

  return (
    <div className="card dice-result bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
      <div className="card-body p-6">
        <h6 className="text-gray-500 mb-3 text-center">
          {round ? `이전 회차 결과 (${round}회차)` : "결과 불러오는 중..."}
        </h6>

        <div id="diceContainer" className="dice-container flex justify-center gap-3 m-4">
          {dice.map((face, index) => <Dice key={index} face={face} />)}
        </div>

        {sum !== null && (
          <div
            className="w-full py-3 text-xl font-semibold text-white bg-[#28a745] border-0 rounded-lg text-center"
          >
            <div className="font-bold">
              {sum} {sum <= 10 ? '소' : '대'} {sum % 2 === 0 ? '짝' : '홀'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
