'use client'

import Link from "next/link";
import { BsDice6, BsHouse } from 'react-icons/bs';

export default function PointList() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Link
        href="/game"
        className="w-full inline-flex justify-center items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-md transition"
      >
        <BsDice6 />
        <span>게임하기</span>
      </Link>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex justify-center items-center gap-1 border border-gray-600 text-gray-700 hover:bg-gray-100 text-sm font-semibold py-2 px-3 rounded-md transition"
      >
        <BsHouse />
        <span>홈으로</span>
      </a>
    </div>
  );
}
