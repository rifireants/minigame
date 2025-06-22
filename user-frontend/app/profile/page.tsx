'use client';

import { useEffect, useState } from 'react';

import ProfileHeader from "../../components/ProfileHeader";
import ProfileCard from "../../components/ProfileCard";
import AdminMenu from "../../components/AdminMenu";
import ProfileMenu from "../../components/ProfileMenu";
import RecentBets from "../../components/RecentBets";
import RecentPointLog from "../../components/RecentPoints";
import QuickNav from "../../components/QuickNav";

interface User {
  userid: string;
  username: string;
  level: string;
  point: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);


  const confirmLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      window.location.href = '/logout';
    }
  };

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <ProfileHeader />
      <ProfileCard name={user?.username} id={user?.userid} level={user?.level>1 ? "시스템 관리자" : "유저"} points={user?.point} />
      <AdminMenu />
      <ProfileMenu />
      <RecentBets />
      <RecentPointLog />
      <QuickNav />
    </main>
  );
}
