import HistorytHeader from "../../components/HistorytHeader";
import HistorytStat from "../../components/HistorytStat";
import HistorytFilter from "../../components/HistorytFilter";
import HistorytList from "../../components/HistorytList";
import HistorytNav from "../../components/HistorytNav";
import QuickNav from "../../components/QuickNav";

export default function HistorytPage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <HistorytHeader />
      <HistorytStat />
      <HistorytFilter />
      <HistorytList />
      <HistorytNav />
      <QuickNav />
    </main>
  );
}
