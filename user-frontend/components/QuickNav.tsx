"use client";

import { BsHouseFill, BsCalendarCheckFill, BsDice6Fill, BsChatDotsFill, BsPersonFill } from "react-icons/bs";

export default function QuickNav() {
  return (
    <nav id="quickNav" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 max-w-md mx-auto w-full">
      <ul className="flex justify-between items-center py-3 px-6">
        <li className="flex-1">
          <a href="/" className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]">
            <BsHouseFill className="text-xl" />
            <span className="text-xs">메인</span>
          </a>
        </li>
        <li className="flex-1">
          <a href="/" className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]">
            <BsCalendarCheckFill className="text-xl" />
            <span className="text-xs">예약</span>
          </a>
        </li>
        <li className="flex-1">
          <a href="/game" className="flex flex-col items-center text-[#3b82f6]">
            <BsDice6Fill className="text-xl" />
            <span className="text-xs">이벤트</span>
          </a>
        </li>
        <li className="flex-1">
          <a href="/chat" className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]">
            <BsChatDotsFill className="text-xl" />
            <span className="text-xs">채팅</span>
          </a>
        </li>
        <li className="flex-1">
          <a href="/profile" className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]">
            <BsPersonFill className="text-xl" />
            <span className="text-xs">마이페이지</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
