'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsCurrencyDollar, BsBank, BsCreditCard, BsPerson, BsClipboard, BsInfoCircle } from "react-icons/bs";

type HistoryItem = {
  type: string;
  date: string;
  status: '승인' | '거부';
  amount: string;
};

const historyData: HistoryItem[] = [
  { type: '충전', date: '06/17 21:51', status: '거부', amount: '50,000원' },
  { type: '출금', date: '06/13 23:29', status: '거부', amount: '1,000,000원' },
  { type: '출금', date: '06/13 23:23', status: '승인', amount: '1,000,000원' },
  { type: '출금', date: '06/13 23:19', status: '거부', amount: '1,000,000원' },
  { type: '충전', date: '06/13 23:03', status: '승인', amount: '1,000,000원' },
];

const statusColor = {
  승인: 'bg-green-500 text-white',
  거부: 'bg-red-500 text-white',
};

export default function PaymentWithdraw() {
  const [amount, setAmount] = useState<number | string>('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('최고관리자');
  const maxAmount = 172100;

  const handleSelectAmount = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`출금 신청 완료: ${amount}원`);
    // TODO: 제출 처리 로직 추가
  };


  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4 m-4">
        <h6 className="text-sm text-gray-500 mb-4">출금 금액 선택</h6>

        <form onSubmit={handleSubmit}>
          {/* 금액 버튼 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[10000, 50000, 100000, Math.min(maxAmount, 1000000)].map((val, idx) => (
              <Button
                key={idx}
                type="button"
                onClick={() => handleSelectAmount(val)}
                className="w-full py-3 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg font-bold"
              >
                {val === Math.min(maxAmount, 1000000) ? '전액출금' : `${val.toLocaleString()}원`}
              </Button>
            ))}
          </div>

          {/* 직접 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">직접 입력</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-2 text-green-500 bg-white border-r">
                <BsCurrencyDollar />
              </span>
              <input
                type="number"
                className="w-full p-2 outline-none"
                placeholder="출금할 금액을 입력하세요"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={10000}
                max={maxAmount}
              />
            </div>
            <small className="text-gray-500">최소: 10,000원, 최대: {maxAmount.toLocaleString()}원</small>
          </div>

          {/* 은행 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">은행</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-2 text-green-500 bg-white border-r">
                <BsBank />
              </span>
              <select
                className="w-full p-2 outline-none"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              >
                <option value="">은행 선택</option>
                {[
                  '국민은행',
                  '신한은행',
                  '우리은행',
                  '하나은행',
                  '농협은행',
                  '기업은행',
                  '새마을금고',
                  '신협',
                  '케이뱅크',
                  '카카오뱅크',
                  '토스뱅크',
                ].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 계좌번호 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">계좌번호</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-2 text-green-500 bg-white border-r">
                <BsCreditCard />
              </span>
              <input
                type="text"
                className="w-full p-2 outline-none"
                placeholder="계좌번호 (- 없이 입력)"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 예금주명 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">예금주명</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-2 text-green-500 bg-white border-r">
                <BsPerson />
              </span>
              <input
                type="text"
                className="w-full p-2 outline-none"
                placeholder="예금주명"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                required
              />
            </div>
          </div>

          {/* submit 버튼 */}
          <Button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            <BsBank className="mr-2" />
            출금 신청
          </Button>
        </form>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 m-4">
        <h6 className="text-sm text-gray-500 mb-4">최근 신청 내역</h6>

        <div className="space-y-4">
          {historyData.map((item, index) => (
            <div key={index} className="border-b pb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{item.type}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full text-center ${statusColor[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="text-sm text-gray-700">금액: <strong>{item.amount}</strong></div>
            </div>
          ))}
        </div>
        {/* 전체 내역 보기 버튼 */}
        <div className="text-center mt-4">
          <a href="payment_history.php" className="text-blue-500 hover:text-blue-700 font-medium text-sm">
            전체 내역 보기
          </a>
        </div>
      </div >
    </>
  );
}
