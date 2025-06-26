"use client";

import { BsChatHeart } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function MainBanner() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById("authModal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <div className="text-center p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">✨ 특별한 만남이 기다려요</h2>
      <p className="text-sm text-gray-500 mb-5">지금 바로 채팅을 시작해보세요!</p>
      <Button id="startChatBtn"
        onClick={handleClick}
        className="bg-[#ff4757] text-white px-6 py-2 rounded-full font-semibold transition hover:bg-[#ff3742] hover:shadow-md"
      >
        <div className="inline-flex items-center gap-2">
          <BsChatHeart className="text-lg" />
          채팅 시작하기
        </div>
      </Button>
    </div>
  );
}
