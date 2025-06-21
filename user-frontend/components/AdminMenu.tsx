// components/AdminMenu.tsx
import React from 'react';
import { BsSpeedometer2, BsGearWideConnected } from "react-icons/bs";

const AdminMenu = () => {
  return (
    <div className="p-5 text-white">
      <h3 className="text-xl font-bold text-[#667eea] mb-4 flex items-center gap-3">
        <BsSpeedometer2 className="mr-2" />관리자 도구
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <a href="/admin" className="bg-white border border-[#e9ecef] rounded-xl p-4 text-center text-[#495057] transition-all shadow-md hover:border-[#667eea] hover:text-[#667eea] transform hover:translate-y-[-2px] flex flex-col items-center">
          <BsGearWideConnected className="text-2xl m-2" />
          <div className="text-sm font-semibold">통합 관리</div>
        </a>
      </div>
    </div>
  );
};

export default AdminMenu;
