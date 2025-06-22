"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function AuthModal() {
  const handleProceed = () => {
    window.location.href = "/game";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const modal = document.getElementById("signModal") as HTMLDialogElement | null;
      modal?.showModal();
    }
  }, []);

  return (
    <dialog id="authModal" className="w-96 p-6 rounded-lg shadow-lg bg-white">
      <div className="flex justify-center mb-5">
        <i className="text-blue-600 text-5xl bi bi-shield-check" />
      </div>
      <h5 className="text-center text-xl font-semibold mb-4">본인인증이 필요합니다</h5>
      <p className="text-center text-sm text-gray-500 mb-6">
        본인인증 후 서비스 이용이 가능합니다.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={handleProceed}
          className="bg-[#ff4757] text-white px-8 py-2 rounded-full font-semibold transition hover:bg-[#ff3742]"
        >
          확인
        </Button>
      </div>
    </dialog>
  );
}
