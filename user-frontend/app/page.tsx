import MainHeader from "../components/MainHeader";
import MainBanner from "../components/MainBanner";
import RecentChats from "../components/RecentChats";
import QuickNav from "../components/QuickNav";
import AuthModal from "../components/AuthModal";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <MainHeader />
      <MainBanner />
      <RecentChats />
      <QuickNav />
      <AuthModal />
      <LoginModal />
      <SignupModal />
    </main>
  );
}
