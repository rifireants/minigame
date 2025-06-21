"use client";

import { Button } from "@/components/ui/button";

export default function LoginModal() {
  const handleLogin = () => {
    // 로그인 처리 로직 추가 (예: API 호출, 상태 업데이트 등)
    const gameUrl = localStorage.getItem("gameUrl");
    if (gameUrl) {
      window.location.href = gameUrl;
    }
  };

  return (
    <dialog id="loginModal" className="w-96 p-6 rounded-lg shadow-lg bg-white">
      <div className="flex justify-center mb-5">
        <i className="text-blue-600 text-5xl bi bi-person-fill" />
      </div>
      <h5 className="text-center text-xl font-semibold mb-4">로그인</h5>
      <p className="text-center text-sm text-gray-500 mb-6">회원님, 로그인 후 서비스를 이용하세요.</p>
      <form className="space-y-4">
        <input
          type="userid"
          placeholder="아이디"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleLogin}
            className="bg-[#ff4757] text-white px-8 py-2 rounded-full font-semibold transition hover:bg-[#ff3742]"
          >
            로그인
          </Button>
        </div>
      </form>
    </dialog>
  );
}
