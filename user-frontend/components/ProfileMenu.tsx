import { BsCreditCard, BsChevronRight, BsDice6, BsListUl, BsBank } from "react-icons/bs";

const ProfileMenu = () => {

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold text-[#333] mb-4">메뉴</h3>
      <div className="space-y-4">
        <a
          href='/payment'
          className="flex items-center justify-between p-4 text-[#333] hover:bg-[#fff5f5] hover:text-[#ff4757] hover:transform hover:translate-x-3 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f8f9fa] rounded-lg flex items-center justify-center">
              <BsCreditCard className="mr-2" />
            </div>
            <span className="text-lg font-medium">충전하기</span>
          </div>
          <BsChevronRight className="mr-2" />
        </a>
        <a
          href='/payment'
          className="flex items-center justify-between p-4 text-[#333] hover:bg-[#fff5f5] hover:text-[#ff4757] hover:transform hover:translate-x-3 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f8f9fa] rounded-lg flex items-center justify-center">
              <BsBank className="mr-2" />
            </div>
            <span className="text-lg font-medium">출금하기</span>
          </div>
          <BsChevronRight className="mr-2" />
        </a>
        <a
          href='/historyt'
          className="flex items-center justify-between p-4 text-[#333] hover:bg-[#fff5f5] hover:text-[#ff4757] hover:transform hover:translate-x-3 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f8f9fa] rounded-lg flex items-center justify-center">
              <BsListUl className="mr-2" />
            </div>
            <span className="text-lg font-medium">입출금 내역</span>
          </div>
          <BsChevronRight className="mr-2" />
        </a>
        <a
          href='/historyb'
          className="flex items-center justify-between p-4 text-[#333] hover:bg-[#fff5f5] hover:text-[#ff4757] hover:transform hover:translate-x-3 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f8f9fa] rounded-lg flex items-center justify-center">
              <BsDice6 className="mr-2" />
            </div>
            <span className="text-lg font-medium">베팅 내역</span>
          </div>
          <BsChevronRight className="mr-2" />
        </a>
      </div>
    </div>
  );
};

export default ProfileMenu;
