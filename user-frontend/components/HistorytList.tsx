'use client'
import { useState, useEffect } from 'react';

interface TransactionItem {
  type: '충전' | '출금';
  date: string;
  status: '승인됨' | '거부됨' | '대기중';
  amount: string;
  details: string;
}

const Badge = ({ status }: { status: string }) => {
  const base = "text-white text-xs font-semibold px-3 py-1 rounded inline-block";
  const statusClass = status === '승인됨' ? 'bg-green-600' : status === '거부됨' ? 'bg-red-600' : 'bg-gray-600';
  return <span className={`${base} ${statusClass}`}>{status}</span>;
};

export default function HistorytList({ typeFilter, statusFilter }: { typeFilter: 'all' | 'deposit' | 'withdrawal'; statusFilter: 'all' | 'pending' | 'approved' | 'rejected' }) {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [depositsRes, withdrawalsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposits`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const deposits = await depositsRes.json();
        const withdrawals = await withdrawalsRes.json();

        const mappedDeposits: TransactionItem[] = deposits.map((d: any) => ({
          type: '충전',
          date: new Date(d.createdAt).toLocaleString(),
          status: d.status === 'approved' ? '승인됨' : d.status === 'rejected' ? '거부됨' : '대기중',
          amount: d.amount.toLocaleString() + '원',
          details: `입금자명: ${d.accountHolder || '-'} | 계좌: ${d.account || '-'}`,
        }));

        const mappedWithdrawals: TransactionItem[] = withdrawals.map((w: any) => ({
          type: '출금',
          date: new Date(w.createdAt).toLocaleString(),
          status: w.status === 'approved' ? '승인됨' : w.status === 'rejected' ? '거부됨' : "대기중",
          amount: w.amount.toLocaleString() + '원',
          details: `예금주: ${w.accountHolder || '-'} | 계좌: ${w.accountNumber || '-'}`,
        }));

        const merged = [...mappedDeposits, ...mappedWithdrawals].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(merged);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = typeFilter === 'all' || (typeFilter === 'deposit' && tx.type === '충전') || (typeFilter === 'withdrawal' && tx.type === '출금');
    const statusMatch = statusFilter === 'all' ||
      (statusFilter === 'pending' && tx.status === '대기중') ||
      (statusFilter === 'approved' && tx.status === '승인됨') ||
      (statusFilter === 'rejected' && tx.status === '거부됨');
    return typeMatch && statusMatch;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 mb-4 text-sm font-semibold">
        신청 내역 (총 {filteredTransactions.length}건)
      </h6>

      <div className="space-y-6">
        {filteredTransactions.map((tx, i) => (
          <div key={i} className="border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                  {tx.type}
                </span>
                <span className="text-gray-500 text-xs">{tx.date}</span>
              </div>
              <Badge status={tx.status} />
            </div>
            <div className="text-sm text-gray-700 mb-2">
              금액: <strong>{tx.amount}</strong>
            </div>
            <div className="text-xs text-gray-500">
              {tx.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
