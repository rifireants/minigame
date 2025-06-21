// components/ProfileHeader.tsx
import React from 'react';
import { BsShieldCheck } from "react-icons/bs";

const ProfileHeader = () => {
  return (
    <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-5 text-center relative">
      <h1 className="text-2xl font-bold flex items-center justify-center">
        <BsShieldCheck className="text-xl mr-2"/>관리자 페이지
      </h1>
      <p className="opacity-90 text-sm mt-1">시스템 관리 및 내 정보 확인</p>
    </div>
  );
};

export default ProfileHeader;
