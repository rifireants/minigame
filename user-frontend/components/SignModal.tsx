"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignModal() {
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const validate = () => {
    if (!userid.trim()) return "아이디를 입력하세요";
    if (!password.trim()) return "비밀번호를 입력하세요";
    if (showSignup) {
      if (!username.trim()) return "이름을 입력하세요";
      if (password.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다";
      if (!inviteCode.trim()) return "가입코드를 입력하세요";
    }
    return "";
  };

  const handleAuth = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const endpoint = showSignup ? "/auth/register" : "/auth/login";
    setError("");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(showSignup ? { userid, username, password, inviteCode } : { userid, password }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "/";
      } else if (res.ok && showSignup) {
        setError("회원가입이 완료되었습니다. 로그인 해주세요.");
        setShowSignup(false);
      } else {
        if (!res.ok && !showSignup) {
          setError("아이디 또는 비밀번호가 올바르지 않습니다");
        } else {
          setError(data.message || "오류가 발생했습니다");
        }
      }
    } catch (err) {
      setError("네트워크 오류");
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const modal = document.getElementById("signModal") as HTMLDialogElement | null;
        if (modal?.open) {
          e.preventDefault();
          e.stopPropagation(); // ESC 입력 자체 막기
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  return (
    <dialog id="signModal" className="w-96 p-6 rounded-lg shadow-lg bg-white"
      onCancel={(e) => e.preventDefault()}>
      <div className="flex justify-center mb-5">
        <i className="text-blue-600 text-5xl bi bi-person-fill" />
      </div>
      <h5 className="text-center text-xl font-semibold mb-4">
        {showSignup ? "회원가입" : "로그인"}
      </h5>
      <p className="text-center text-sm text-gray-500 mb-6">
        {showSignup
          ? "회원가입 후 서비스를 이용하세요."
          : "회원님, 로그인 후 서비스를 이용하세요."}
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="아이디"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        {showSignup && <input
          type="text"
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />}
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showSignup && <input
          type="text"
          placeholder="가입코드"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />}
        <Button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {showSignup ? "회원가입" : "로그인"}
        </Button>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <p className="text-center text-sm text-gray-500">
          {showSignup ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
          <button
            type="button"
            className="ml-1 text-blue-600 hover:underline"
            onClick={() => {
              setShowSignup(!showSignup);
              setError("");
            }}
          >
            {showSignup ? "로그인" : "회원가입"}
          </button>
        </p>
      </form>
    </dialog>
  );
}
