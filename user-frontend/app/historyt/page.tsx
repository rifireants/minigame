'use client'
import { useState } from "react";
import HistorytHeader from "../../components/HistorytHeader";
import HistorytStat from "../../components/HistorytStat";
import HistorytFilter from "../../components/HistorytFilter";
import HistorytList from "../../components/HistorytList";
import HistorytNav from "../../components/HistorytNav";
import QuickNav from "../../components/QuickNav";

export default function HistorytPage() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <HistorytHeader />
      <HistorytStat />
      <HistorytFilter
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <HistorytList typeFilter={typeFilter} statusFilter={statusFilter} />
      <HistorytNav />
      <QuickNav />
    </main>
  );
}
