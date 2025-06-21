import HistorybHeader from "../../components/HistorybHeader";
import HistorybStat from "../../components/HistorybStat";
import HistorybList from "../../components/HistorybList";
import HistorybNav from "../../components/HistorybNav";
import QuickNav from "../../components/QuickNav";

export default function HistorybPage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <HistorybHeader />
      <HistorybStat />
      <HistorybList />
      <HistorybNav />
      <QuickNav />
    </main>
  );
}
