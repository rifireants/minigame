import PointHeader from "../../components/PointHeader";
import PointList from "../../components/PointList";
import PointNav from "../../components/PointNav";
import QuickNav from "../../components/QuickNav";

export default function HistorybPage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <PointHeader />
      <PointList />
      <PointNav />
      <QuickNav />
    </main>
  );
}
