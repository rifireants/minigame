import PaymentHeader from "../../components/PaymentHeader";
import PaymentTab from "../../components/PaymentTab";
import QuickNav from "../../components/QuickNav";

export default function PaymentPage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <PaymentHeader />
      <PaymentTab />
      <QuickNav />
    </main>
  );
}
