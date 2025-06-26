'use client';

import { useEffect, useState } from "react";
import ChatHeader from "../../components/ChatHeader";
import ChatSearch from "../../components/ChatSearch";
import ChatList from "../../components/ChatList";
import QuickNav from "../../components/QuickNav";

export default function ChatPage() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // null = 로딩중

  // ✅ 1. 페이지 로딩 시 토큰 검증
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
        setIsVerified(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsVerified(true);
        } else {
          (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
          setIsVerified(false);
        }
      } catch {
        (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
        setIsVerified(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ 2. ChatCard2 클릭 시 authModal 띄우기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldTriggerAuth =
        target.closest(".chat-card2") ||
        target.closest(".chat-search") ||
        target.closest(".chat-filter");

      if (shouldTriggerAuth) {
        const authModal = document.getElementById("authModal") as HTMLDialogElement | null;
        authModal?.showModal();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ✅ 3. 로딩 중일 때는 렌더링 하지 않음
  if (isVerified === null) return null;

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <ChatHeader />
      <ChatSearch />
      <ChatList />
      <QuickNav />
    </main>
  );
}
