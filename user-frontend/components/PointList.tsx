'use client';

import { useEffect, useState } from 'react';
import { fetchPoints, Point } from '@/lib/api';

export default function PointList() {
  const [logs, setLogs] = useState<Point[]>([]);

  useEffect(() => {
    fetchPoints().then(setLogs);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="p-5 space-y-6">
        {logs && (
          <div className="space-y-4">
            {logs.map((point, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-[#f1f3f4]">
                <div>
                  <div className="font-semibold text-[#495057]">{point.reason}</div>
                  <div className="text-sm text-[#6c757d]">{new Date(point.createdAt).toLocaleString()}</div>
                </div>
                <div className={`font-semibold text-${point.type === 'increase' ? 'green-500' : 'red-500'}`}>
                  {point.type === 'increase' ? `+${point.amount.toLocaleString()}P` : `-${point.amount.toLocaleString()}P`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
