'use client';

import React, { useState } from 'react';
import ChatCard2 from "./ChatCard2";

const profiles = [
  {
    "name": "박주희",
    "age": 24,
    "location": "성남시, 경기",
    "imageUrl": "/img/경기 성남시 박주희.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 박주희입니다 😊",
    "interests": ["사진", "카페", "독서", "요리"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "정윤주",
    "age": 26,
    "location": "세종시, 경기",
    "imageUrl": "/img/경기 세종시 정윤주.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 정윤주입니다 😊",
    "interests": ["헬스", "여행", "사진", "영화"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "이하얀",
    "age": 23,
    "location": "시흥시, 경기",
    "imageUrl": "/img/경기 시흥시 이하얀.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 이하얀입니다 😊",
    "interests": ["요리", "독서", "카페", "사진"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "황하나",
    "age": 25,
    "location": "북구, 광주",
    "imageUrl": "/img/광주 북구 황하나.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 황하나입니다 😊",
    "interests": ["영화", "카페", "헬스", "요리"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "강연수",
    "age": 27,
    "location": "수성구, 대구",
    "imageUrl": "/img/대구 수성구 강연수.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 강연수입니다 😊",
    "interests": ["여행", "독서", "요리", "헬스"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "윤민정",
    "age": 22,
    "location": "중구, 대구",
    "imageUrl": "/img/대구 중구 윤민정.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 윤민정입니다 😊",
    "interests": ["카페", "문학", "사진", "영화"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "김민영",
    "age": 24,
    "location": "동래구, 부산",
    "imageUrl": "/img/부산 동래구 김민영.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 김민영입니다 😊",
    "interests": ["와인", "요리", "카페", "독서"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "이미래",
    "age": 21,
    "location": "중구, 부산",
    "imageUrl": "/img/부산 중구 이미래.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 이미래입니다 😊",
    "interests": ["여행", "언어", "카페", "사진"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "김윤정",
    "age": 28,
    "location": "강남구, 서울",
    "imageUrl": "/img/서울 강남구 김윤정.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 김윤정입니다 😊",
    "interests": ["음악", "사진", "독서", "영화"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "민수진",
    "age": 26,
    "location": "관악구, 서울",
    "imageUrl": "/img/서울 관악구 민수진.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 민수진입니다 😊",
    "interests": ["카페", "요리", "여행", "헬스"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "김소현",
    "age": 25,
    "location": "노원구, 서울",
    "imageUrl": "/img/서울 노원구 김소현.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 김소현입니다 😊",
    "interests": ["영화", "음악", "브런치", "요가"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "강빛나",
    "age": 23,
    "location": "마포구, 서울",
    "imageUrl": "/img/서울 마포구 강빛나.png",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 강빛나입니다 😊",
    "interests": ["문학", "카페", "사진", "요리"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "서예빈",
    "age": 24,
    "location": "중구, 울산",
    "imageUrl": "/img/울산 중구 서예빈.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 서예빈입니다 😊",
    "interests": ["사진", "여행", "독서", "헬스"],
    "status": "온라인",
    "newBadge": true
  },
  {
    "name": "최유미",
    "age": 22,
    "location": "광산구, 광주",
    "imageUrl": "/img/광주 광산구 최유미.jpg",
    "intro": "안녕하세요! 좋은 인연을 찾고 있는 최유미입니다 😊",
    "interests": ["사진", "여행", "독서", "헬스"],
    "status": "온라인",
    "newBadge": true
  }
]

const ChatList = () => {
  const [likedProfiles, setLikedProfiles] = useState<Set<number>>(new Set());

  const handleLike = (profileId: number) => {
    const updatedLikes = new Set(likedProfiles);
    if (updatedLikes.has(profileId)) {
      updatedLikes.delete(profileId);
    } else {
      updatedLikes.add(profileId);
    }
    setLikedProfiles(updatedLikes);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">추천 프로필</h2>
        <span className="text-gray-600" id="resultCount">
          {profiles.length}명
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full" id="profileList">
        {profiles.map((profile, idx) => (
          <ChatCard2 key={idx} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
