import ProfileHeader from "../../components/ProfileHeader";
import ProfileCard from "../../components/ProfileCard";
import AdminMenu from "../../components/AdminMenu";
import ProfileMenu from "../../components/ProfileMenu";
import RecentBets from "../../components/RecentBets";
import RecentPointLog from "../../components/RecentPoints";
import QuickNav from "../../components/QuickNav";

export default function ProfilePage() {
  const confirmLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      window.location.href = '/logout';
    }
  };

  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <ProfileHeader />
      <ProfileCard name="최고관리자" id="admin" level="시스템 관리자" points="172,100" />
      <AdminMenu />
      <ProfileMenu />
      <RecentBets />
      <RecentPointLog />
      <QuickNav />
    </main>
  );
}
