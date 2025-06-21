"use client";

import { Button } from "@/components/ui/button";
import { BsHeartFill, BsGeoAltFill } from "react-icons/bs";

type ChatCardProps = {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  intro: string;
  interests: string[];
  status: string;
  newBadge: boolean;
};

export default function ChatCard2({ name, age, location, imageUrl }: ChatCardProps) {
  return (
    <a
      href="/game"
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
      data-category="new 20s"
    >
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/경기 성남시 박주희.jpg')" }}
      >
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-xl flex items-center">
          <span className="w-1 h-1 bg-white rounded-full mr-1 animate-ping"></span>온라인
        </div>
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-xl">
          NEW
        </div>
        <Button
          type="button"
          variant="ghost"
          className="absolute bottom-8 right-8 text-[#ff4757] hover:text-pink-600"
        >
          <BsHeartFill />
        </Button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-lg font-semibold">박주희</h3>
          <p className="text-sm">24세</p>
          <div className="flex items-center text-xs mt-1">
            <BsGeoAltFill className="mr-2" />
            성남시, 경기
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <p className="text-sm text-gray-800 mb-2">
          안녕하세요! 좋은 인연을 찾고 있는 박주희입니다 😊
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full">사진</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">카페</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">독서</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">요리</span>
        </div>
      </div>
    </a>
  );
}
