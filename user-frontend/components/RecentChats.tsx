import { BsPeopleFill } from "react-icons/bs";
import ChatCard from "./ChatCard";

const users = [
  {
    name: '박주희',
    age: 24,
    location: '성남시, 경기',
    imageUrl: '/img/경기 성남시 박주희.jpg',
  },
  {
    name: '정윤주',
    age: 26,
    location: '세종시, 경기',
    imageUrl: '/img/경기 세종시 정윤주.jpg',
  },
  {
    name: '이하얀',
    age: 23,
    location: '시흥시, 경기',
    imageUrl: '/img/경기 시흥시 이하얀.jpg',
  },
  {
    name: '황하나',
    age: 25,
    location: '북구, 광주',
    imageUrl: '/img/광주 북구 황하나.jpg',
  },
  {
    name: '강연수',
    age: 27,
    location: '수성구, 대구',
    imageUrl: '/img/대구 수성구 강연수.jpg',
  },
  {
    name: '윤민정',
    age: 22,
    location: '중구, 대구',
    imageUrl: '/img/대구 중구 윤민정.jpg',
  },
  {
    name: '김민영',
    age: 24,
    location: '동래구, 부산',
    imageUrl: '/img/부산 동래구 김민영.jpg',
  },
  {
    name: '이미래',
    age: 21,
    location: '중구, 부산',
    imageUrl: '/img/부산 중구 이미래.jpg',
  },
  {
    name: '김윤정',
    age: 28,
    location: '강남구, 서울',
    imageUrl: '/img/서울 강남구 김윤정.jpg',
  },
  {
    name: '민수진',
    age: 26,
    location: '관악구, 서울',
    imageUrl: '/img/서울 관악구 민수진.jpg',
  },
  {
    name: '김소현',
    age: 25,
    location: '노원구, 서울',
    imageUrl: '/img/서울 노원구 김소현.jpg',
  },
  {
    name: '강빛나',
    age: 23,
    location: '마포구, 서울',
    imageUrl: '/img/서울 마포구 강빛나.png',
  },
  {
    name: '서예빈',
    age: 24,
    location: '중구, 울산',
    imageUrl: '/img/울산 중구 서예빈.jpg',
  },
  {
    name: '최유미',
    age: 22,
    location: '광산구, 광주',
    imageUrl: '/img/광주 광산구 최유미.jpg',
  }
];

export default function RecentChats() {
  return (
    <section className="px-4 py-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
        <BsPeopleFill className="text-xl text-[#3b82f6]" />
        새로운 매칭
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user, idx) => (
          <ChatCard key={idx} {...user} />
        ))}
      </div>
    </section>
  );
}
