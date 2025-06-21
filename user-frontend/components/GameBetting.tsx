import { Button } from "@/components/ui/button";

export default function GameBetting() {
  return (
    <div className="card bg-white border border-gray-200 rounded-2xl shadow-2xl m-4">
      <div className="card-body p-6">
        <h6 className="text-gray-500 mb-3">베팅 선택</h6>

        {/* 대소 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Button
              type="button"
              data-group="high_low"
              data-value="low"
              className="w-full py-3 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              <div className="font-bold">소 (3-10)</div>
            </Button>
          </div>
          <div>
            <Button
              type="button"
              data-group="high_low"
              data-value="high"
              className="w-full py-3 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              <div className="font-bold">대 (11-18)</div>
            </Button>
          </div>
        </div>

        {/* 홀짝 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Button
              type="button"
              data-group="odd_even"
              data-value="odd"
              className="w-full py-3 bg-white text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
            >
              <div className="font-bold">홀</div>
            </Button>
          </div>
          <div>
            <Button
              type="button"
              data-group="odd_even"
              data-value="even"
              className="w-full py-3 bg-white text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
            >
              <div className="font-bold">짝</div>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
