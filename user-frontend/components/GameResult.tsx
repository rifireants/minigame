import Dice from "./Dice";
import { Button } from "@/components/ui/button";

export default function GameResult() {
  return (
    <div className="card dice-result bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
      <div className="card-body p-6">
        <h6 className="text-gray-500 mb-3 text-center">이전 회차 결과 (1961회차)</h6>

        {/* 주사위 컨테이너 */}
        <div id="diceContainer" className="dice-container flex justify-center gap-3 m-4">
          <Dice face={3} />
          <Dice face={5} />
          <Dice face={6} />
        </div>
        {/* 결과 표시 */}
        <Button
          type="button"
          data-group="odd_even"
          data-value="odd"
          className="w-full py-3 text-xl font-semibold text-white bg-[#28a745] border-0 rounded-lg"
        >
          <div className="font-bold">15 대 홀</div>
        </Button>
      </div>
    </div>
  );
}
