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

export default function ChatCard2({
  name,
  age,
  location,
  imageUrl,
  intro,
  interests,
  status,
  newBadge, }: ChatCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById("authModal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
      data-category="new 20s"
    >
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        {status === "온라인" && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-xl flex items-center">
            <span className="w-1 h-1 bg-white rounded-full mr-1 animate-ping"></span>
            {status}
          </div>
        )}

        {newBadge && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-xl">
            NEW
          </div>
        )}

        <Button
          type="button"
          variant="ghost"
          className="absolute bottom-8 right-8 text-[#ff4757] hover:text-pink-600"
        >
          <BsHeartFill />
        </Button>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm">{age}세</p>
          <div className="flex items-center text-xs mt-1">
            <BsGeoAltFill className="mr-2" />
            {location}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <p className="text-sm text-gray-800 mb-2">{intro}</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
