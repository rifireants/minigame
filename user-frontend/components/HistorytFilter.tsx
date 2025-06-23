'use client'
import { useState } from 'react';

interface HistorytFilterProps {
  typeFilter: 'all' | 'deposit' | 'withdrawal';
  setTypeFilter: (value: 'all' | 'deposit' | 'withdrawal') => void;
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected';
  setStatusFilter: (value: 'all' | 'pending' | 'approved' | 'rejected') => void;
}

const typeOptions = [
  { key: "all", label: "전체" },
  { key: "deposit", label: "충전" },
  { key: "withdrawal", label: "출금" },
];

const statusOptions = [
  { key: "all", label: "전체" },
  { key: "pending", label: "대기중" },
  { key: "approved", label: "승인됨" },
  { key: "rejected", label: "거부됨" },
];

export default function HistorytFilter({
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
}: HistorytFilterProps) {

  const buttonStyle = (active: boolean) =>
    `px-4 py-2 text-sm rounded-md border font-medium mr-2 mb-2 ${active
      ? "bg-blue-500 text-white border-blue-500"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="p-5">
        <h6 className="text-gray-500 text-sm font-semibold mb-3">필터</h6>

        {/* 거래 유형 */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">거래 유형</label>
          <div>
            {typeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setTypeFilter(option.key as typeof typeFilter)}
                className={buttonStyle(typeFilter === option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 처리 상태 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">처리 상태</label>
          <div>
            {statusOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setStatusFilter(option.key as typeof statusFilter)}
                className={buttonStyle(statusFilter === option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
