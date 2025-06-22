// components/ProfileCard.tsx
import React from 'react';
import { BsPlusCircle, BsDashCircle, BsShieldCheck } from "react-icons/bs";

const ProfileCard = ({ userData }: {userData: any}) => {
  return (
    <div className="p-6 border-b border-[#e9ecef]">
      {/* 프로필 카드 */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#ff4757] to-[#ff3742] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
          <BsShieldCheck />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#333] mb-1">{userData ? userData.username : '로딩중...'}</h2>
          <p className="text-sm text-[#6c757d] mb-2">ID: {userData ? userData.userid : '로딩중...'}</p>
          <span className="bg-[#fff3cd] text-[#856404] px-3 py-1 rounded-full text-sm font-semibold">
            {userData ? userData.level : '로딩중...'}
          </span>
        </div>
      </div>

      {/* 포인트 카드 */}
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-5 rounded-lg text-center shadow-xl">
        <div className="text-sm opacity-90 mb-2">보유 포인트</div>
        <div className="text-4xl font-extrabold mb-4">{userData ? userData.point.toLocaleString() + 'P' : '로딩중...'}</div>
        <div className="flex gap-4 justify-center">
          <a href="/payment" className="bg-white bg-opacity-20 border border-white text-white py-2 px-6 rounded-full text-sm font-semibold backdrop-blur-md transition-all hover:bg-opacity-30 flex items-center">
            <BsPlusCircle className="mr-2"/>충전
          </a>
          <a href="/payment" className="bg-white bg-opacity-20 border border-white text-white py-2 px-6 rounded-full text-sm font-semibold backdrop-blur-md transition-all hover:bg-opacity-30 flex items-center">
            <BsDashCircle className="mr-2"/>출금
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
