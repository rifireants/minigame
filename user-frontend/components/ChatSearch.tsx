'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';

const ChatSearch = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const router = useRouter();

  return (
    <div className="p-5">
      {/* Search Box */}
      <div className="chat-search flex items-center border border-gray-300 rounded-lg p-2 mb-4">
        <BsSearch className="mr-2" />
        <input
          type="text"
          id="searchInput"
          className="flex-1 p-2 border-none outline-none"
          placeholder="이름이나 관심사로 검색..."
        />
      </div>

      {/* Filter Tags */}
      <div className="chat-filter flex flex-wrap gap-2">
        {['전체', '서울', '경기', '경북', '경남', '전북', '전남', '강원', '제주'].map((filter) => (
          <span
            key={filter}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            data-filter={filter}
          >
            {filter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChatSearch;
