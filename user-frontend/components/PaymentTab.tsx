'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import PaymentDeposit from "./PaymentDeposit";
import PaymentWithdraw from "./PaymentWithdraw";

export default function PaymentTab() {
  const [activeTab, setActiveTab] = useState<'charge' | 'withdraw'>('charge');

  const handleClick = (tab: 'charge' | 'withdraw') => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 m-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Button
              onClick={() => handleClick("charge")}
              className={`w-full py-3 rounded-lg flex items-center justify-center ${activeTab === "charge"
                  ? "bg-blue-500 text-white"
                  : "border border-blue-500 text-blue-500 bg-white"
                }`}
            >
              <BsPlusCircle className="mr-2" />
              충전
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleClick("withdraw")}
              id="withdrawBtn"
              className={`w-full py-3 rounded-lg flex items-center justify-center ${activeTab === "withdraw"
                  ? "bg-blue-500 text-white"
                  : "border border-blue-500 text-blue-500 bg-white"
                }`}
            >
              <BsDashCircle className="mr-2" />
              출금
            </Button>
          </div>
        </div>
      </div>

      {activeTab === 'charge' && <PaymentDeposit />}
      {activeTab === 'withdraw' && <PaymentWithdraw />}
    </>
  );
}
