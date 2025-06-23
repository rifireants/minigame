'use client';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { BsPlusCircle, BsPerson, BsBank, BsClipboard, BsInfoCircle } from "react-icons/bs";
import { toast } from 'sonner';

export default function PaymentDeposit() {
  const [amount, setAmount] = useState<number | string>(''); // 금액 상태
  const [accountHolder, setAccountHolder] = useState(''); // 입금자명 상태
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposits`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(await res.json());
      } catch (err) {
        console.error("충전 이력 조회 실패", err);
      }
    };

    fetchDepositHistory();
  }, []);

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token"); // 로그인 후 저장된 JWT 토큰
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          accountHolder
        }),
      });

      const result = await response.json();
      if (result.success)
        toast.success(result.message);
      else
        toast.error(result.message);
    } catch (err) {
      toast.error("충전 신청에 실패했습니다.");
    }
  };

  const isDisabled = !amount || !accountHolder;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
        {/* 충전 금액 선택 */}
        <h6 className="text-sm text-gray-500 mb-3">충전 금액 선택</h6>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[10000, 30000, 50000, 100000].map((amountOption) => (
              <div key={amountOption}>
                <Button
                  type="button"
                  onClick={() => handleAmountSelect(amountOption)}
                  className="w-full py-3 bg-gray-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg font-bold"
                >
                  {amountOption.toLocaleString()}원
                </Button>
              </div>
            ))}
          </div>

          {/* 직접 입력 */}
          <div className="mb-3">
            <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700">직접 입력</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <span className="px-3 py-2 bg-white text-blue-500 border-r">{'₩'}</span>
              <input
                type="number"
                className="flex-1 px-3 py-2 border-none outline-none"
                id="chargeAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="충전할 금액을 입력하세요"
                min="10000"
                max="1000000"
              />
            </div>
            <small className="text-sm text-gray-500">최소: 10,000원</small>
          </div>

          {/* 입금자명 */}
          <div className="mb-3">
            <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700">입금자명</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <span className="px-3 py-2 bg-white text-blue-500 border-r">
                <BsPerson className="mr-2" />
              </span>
              <input
                type="text"
                value={accountHolder}
                className="flex-1 px-3 py-2 border-none outline-none"
                id="accountHolder"
                placeholder="입금하실 분의 성함"
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            <BsPlusCircle className="mr-2" />
            충전 신청
          </Button>
        </form>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
        {/* 관리자 계좌 정보 */}
        <h6 className="text-sm text-gray-500 mb-3">
          <BsBank className="me-2" />입금 계좌 정보
        </h6>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg mb-1">KB국민</div>
            <div className="text-blue-500 font-bold text-xl mb-1">
              담당자에게 문의하세요.
            </div>
            <small className="text-sm text-gray-500">(주)벨루나</small>
          </div>
          <Button
            type="button"
            variant="outline"
            className="px-3 py-1 border-blue-500 text-blue-500"
            onClick={() => navigator.clipboard.writeText("담당자에게 문의하세요.")}
          >
            <BsClipboard />
          </Button>
        </div>

        <div className="alert alert-info mt-3 bg-blue-100 text-blue-600 p-3 rounded-lg text-sm">
          <BsInfoCircle className="me-1" />
          위 계좌로 입금 후 충전 신청해주세요. 관리자 확인 후 포인트가 지급됩니다.
        </div>
      </div >

      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
        <h6 className="text-sm text-gray-500 mb-3">최근 신청 내역</h6>

        {history.length > 0 && (
          <div className="space-y-4">
            {history.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col space-y-2 border-b border-gray-200 pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="font-semibold text-blue-500">충전</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${item.status === "approved"
                      ? "text-green-600 bg-green-100"
                      : item.status === "rejected"
                        ? "text-red-500 bg-red-100"
                        : "text-gray-500 bg-gray-100"
                      }`}
                  >
                    {item.status === "approved" ? "승인" : item.status === "rejected" ? "거절" : "대기"}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">금액: </span>
                  <strong>{item.amount.toLocaleString()}원</strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 전체 내역 보기 버튼 */}
        <div className="text-center mt-4">
          <a href="/historyt" className="text-blue-500 hover:text-blue-700 font-medium text-sm">
            전체 내역 보기
          </a>
        </div>
      </div>
    </>
  );
}
