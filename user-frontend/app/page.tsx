"use client";

import { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import MainBanner from "../components/MainBanner";
import RecentChats from "../components/RecentChats";
import QuickNav from "../components/QuickNav";
import AuthModal from "../components/AuthModal";
import SignModal from "../components/SignModal";

export default function HomePage() {
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const quickNav = document.getElementById("quickNav");
      if (quickNav && quickNav.contains(e.target as Node)) return;

      const token = localStorage.getItem("token");

      // 토큰이 없으면 바로 로그인 모달
      if (!token) {
        const signModal = document.getElementById("signModal") as HTMLDialogElement | null;
        signModal?.showModal();
        return;
      }

      try {
        // 서버에 토큰 검증 요청
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // 토큰 유효 → AuthModal 띄우기
          const authModal = document.getElementById("authModal") as HTMLDialogElement | null;
          authModal?.showModal();
        } else {
          // 토큰 무효 → SsignModal 띄우기
          const signModal = document.getElementById("signModal") as HTMLDialogElement | null;
          signModal?.showModal();
        }
      } catch (err) {
        // 요청 실패 → SsignModal 띄우기
        const signModal = document.getElementById("signModal") as HTMLDialogElement | null;
        signModal?.showModal();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <MainHeader />
      <MainBanner />
      <RecentChats />
      <QuickNav />
      <AuthModal />
      <SignModal />
    </main>
  );
}
