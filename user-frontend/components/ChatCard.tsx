"use client";

import { Button } from "@/components/ui/button";
import { BsHeartFill, BsGeoAltFill } from "react-icons/bs";
import { useState } from "react";

type ChatCardProps = {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
};

export default function ChatCard({ name, age, location, imageUrl }: ChatCardProps) {
  const [liked, setLiked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById("authModal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  return (
    <a
      href='#'
      onClick={handleClick}
      className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <div
        className="h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <Button
          type="button"
          variant="ghost"
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm ${liked ? "bg-[#ff4757] text-white" : "bg-white text-[#ff4757]"
            }`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setLiked(!liked);
          }}
        >
          <BsHeartFill />
        </Button>
        <div className="absolute bottom-12 left-3 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full animate-ping" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-3">
          <div className="text-sm font-bold">{`${name}, ${age}`}</div>
          <div className="text-xs flex items-center gap-1">
            <BsGeoAltFill className="text-xs mr-1" />
            {location}
          </div>
        </div>
      </div>
    </a>
  );
}
