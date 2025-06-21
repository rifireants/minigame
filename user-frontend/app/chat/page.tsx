import ChatHeader from "../../components/ChatHeader";
import ChatSearch from "../../components/ChatSearch";
import ChatList from "../../components/ChatList";
import QuickNav from "../../components/QuickNav";

export default function ChatPage() {
  return (
    <main className="bg-white min-h-screen pb-20 max-w-md mx-auto">
      <ChatHeader />
      <ChatSearch />
      <ChatList />
      <QuickNav />
    </main>
  );
}
