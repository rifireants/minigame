'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';

const ChatSearch = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push('/game'); // 검색을 할 때마다 /game으로 이동
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter); // 필터 상태 변경
    router.push('/game'); // 필터 클릭 시 /game으로 이동
  };

  return (
    <div className="p-5">
      {/* Search Box */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-4">
        <BsSearch className="mr-2" />
        <input
          type="text"
          id="searchInput"
          className="flex-1 p-2 border-none outline-none"
          placeholder="이름이나 관심사로 검색..."
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {['all', 'online', 'new', 'nearby', 'verified', '20s', '30s'].map((filter) => (
          <span
            key={filter}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            data-filter={filter}
            onClick={() => handleFilterClick(filter)}
          >
            {filter === 'all' ? '전체' : filter === 'online' ? '온라인' : filter === 'new' ? '신규' : filter === 'nearby' ? '근처' : filter === 'verified' ? '인증' : filter === '20s' ? '20대' : '30대'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChatSearch;
