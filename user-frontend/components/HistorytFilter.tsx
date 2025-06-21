'use client'
import { useState } from 'react';

export default function HistorytFilter() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const typeOptions = [
    { key: "all", label: "전체" },
    { key: "charge", label: "충전" },
    { key: "withdraw", label: "출금" },
  ];

  const statusOptions = [
    { key: "all", label: "전체" },
    { key: "pending", label: "대기중" },
    { key: "completed", label: "완료" },
    { key: "rejected", label: "거부" },
  ];

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
                onClick={() => setTypeFilter(option.key)}
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
                onClick={() => setStatusFilter(option.key)}
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
