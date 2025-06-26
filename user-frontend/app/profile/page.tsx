'use client';

import { useEffect, useState } from 'react';

import ProfileHeader from "../../components/ProfileHeader";
import ProfileCard from "../../components/ProfileCard";
import AdminMenu from "../../components/AdminMenu";
import ProfileMenu from "../../components/ProfileMenu";
import RecentBets from "../../components/RecentBets";
import RecentPointLog from "../../components/RecentPoints";
import QuickNav from "../../components/QuickNav";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchUser();
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <ProfileHeader />
      <ProfileCard userData={userData} />
      {userData && userData.role == 'admin' && <AdminMenu />}
      <ProfileMenu />
      <RecentBets />
      <RecentPointLog />
      <QuickNav />
    </main>
  );
}
