import GameStatus from "../../components/GameStatus";
import GameResult from "../../components/GameResult";
import GameBetting from "../../components/GameBetting";
import GameBet from "../../components/GameBet";
import GameNav from "../../components/GameNav";
import QuickNav from "../../components/QuickNav";

export default function GamePage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <GameStatus />
      <GameResult />
      <GameBetting />
      <GameBet />
      <GameNav />
      <QuickNav />
    </main>
  );
}
