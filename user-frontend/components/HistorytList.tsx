'use client'
import { useState } from 'react';

type TransactionStatus = "승인됨" | "거부됨";

interface TransactionItem {
  type: "충전" | "출금";
  date: string;
  status: TransactionStatus;
  amount: string;
  details: React.ReactNode;
}

const transactions: TransactionItem[] = [
  {
    type: "충전",
    date: "06/17 21:51",
    status: "거부됨",
    amount: "50,000원",
    details: (
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">입금자명</span>
          <br />
          <strong>최고관리자</strong>
        </div>
        <div>
          <span className="text-gray-500">입금계좌</span>
          <br />
          <span>KB국민 담당자에게 문의하세요. (주)벨루나</span>
        </div>
      </div>
    ),
  },
  // ...다른 항목들도 같은 형식으로 추가
];

const Badge = ({ status }: { status: TransactionStatus }) => {
  const base =
    "text-white text-xs font-semibold px-3 py-1 rounded inline-block";
  const statusClass =
    status === "승인됨" ? "bg-green-600" : "bg-red-600";
  return <span className={`${base} ${statusClass}`}>{status}</span>;
};

export default function HistorytList() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <h6 className="text-gray-500 mb-4 text-sm font-semibold">
        신청 내역 (총 {transactions.length}건)
      </h6>

      <div className="space-y-6">
        {transactions.map((tx, i) => (
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

            <div className="text-sm text-gray-700">
              {tx.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
