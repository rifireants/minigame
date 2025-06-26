"use client";

import { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import MainBanner from "../components/MainBanner";
import RecentChats from "../components/RecentChats";
import QuickNav from "../components/QuickNav";

export default function HomePage() {
  // ✅ 채팅 시작 버튼 클릭 시 authModal 표시
  useEffect(() => {
    const handleClick = () => {
      const authModal = document.getElementById("authModal") as HTMLDialogElement | null;
      authModal?.showModal();
    };

    const btn = document.getElementById("startChatBtn");
    btn?.addEventListener("click", handleClick);

    return () => {
      btn?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <MainHeader />
      <MainBanner />
      <RecentChats />
      <QuickNav />
    </main>
  );
}
