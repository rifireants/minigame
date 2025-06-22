"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignModal() {
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const endpoint = showSignup ? "/auth/register" : "/auth/login";
    setError("");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(showSignup ? { userid, username, password } : { userid, password }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "/";
      } else {
        setError(data.message || "오류가 발생했습니다");
      }
    } catch (err) {
      setError("네트워크 오류");
    }
  };

  return (
    <dialog id="signModal" className="w-96 p-6 rounded-lg shadow-lg bg-white">
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
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup ? "로그인" : "회원가입"}
          </button>
        </p>
      </form>
    </dialog>
  );
}
