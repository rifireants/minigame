import { BsWallet2 } from "react-icons/bs";

export default function PaymentHeader() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl flex items-center">
          <BsWallet2 className="mr-2 text-blue-500" />
          <h4 className="mb-0 font-bold">충전/출금</h4>
        </div>
        <div className="text-right">
          <small className="text-gray-500">보유 포인트</small>
          <div className="text-2xl mb-0 text-blue-500 font-bold">172,100P</div>
        </div>
      </div>
    </div>
  );
}
