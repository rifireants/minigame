"use client";

import { BsHouseFill, BsCalendarCheckFill, BsDice6Fill, BsChatDotsFill, BsPersonFill } from "react-icons/bs";
import AuthModal from "./AuthModal";
import SignModal from "./SignModal";
import { useRouter } from "next/navigation";

export default function QuickNav() {
  const router = useRouter();

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이동 막기
    const authModal = document.getElementById("authModal") as HTMLDialogElement | null;
    authModal?.showModal();
  };

  const protectedNavigate = async (path: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        router.push(path);
      } else {
        (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
      }
    } catch {
      (document.getElementById("signModal") as HTMLDialogElement)?.showModal();
    }
  };

  return (
    <>
      <nav
        id="quickNav"
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 max-w-md mx-auto w-full"
      >
        <ul className="flex justify-between items-center py-3 px-6">
          <li className="flex-1">
            <button
              onClick={() => router.push('/')}
              className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]"
            >
              <BsHouseFill className="text-xl" />
              <span className="text-xs">메인</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={e => handleReservationClick(e)}
              className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]"
            >
              <BsCalendarCheckFill className="text-xl" />
              <span className="text-xs">예약</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => router.push('/game')}
              className="flex flex-col items-center text-[#3b82f6]"
            >
              <BsDice6Fill className="text-xl" />
              <span className="text-xs">이벤트</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => protectedNavigate('/chat')}
              className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]"
            >
              <BsChatDotsFill className="text-xl" />
              <span className="text-xs">채팅</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => protectedNavigate('/profile')}
              className="flex flex-col items-center text-gray-500 hover:text-[#3b82f6]"
            >
              <BsPersonFill className="text-xl" />
              <span className="text-xs">마이페이지</span>
            </button>
          </li>
        </ul>
      </nav>

      <AuthModal />
      <SignModal />
    </>
  );
}
