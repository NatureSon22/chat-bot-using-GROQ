import ChatInput from "./components/ChatInput";
import ChatList from "./components/ChatList";
import { useRef, useState } from "react";

export type ChatType = {
  id: string;
  message: string;
  type: "user" | "bot";
};

const App = () => {
  const [chatList, setChatList] = useState<ChatType[]>([
    {
      id: crypto.randomUUID(),
      message: "Hello, how can I help you?",
      type: "bot",
    },
  ]);

  const chatListContainerRef = useRef<HTMLDivElement>(null);

  const slideEnd = () => {
    if (chatListContainerRef.current) {
      chatListContainerRef.current.scrollTo({
        top: chatListContainerRef.current.scrollHeight, // scroll to the bottom
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-end items-center bg-indigo-800">
      <div className="w-full flex-1 overflow-y-auto">
        <ChatList chatList={chatList} chatListRef={chatListContainerRef} />
      </div>
      <ChatInput setChatList={setChatList} slideEnd={slideEnd} />
    </div>
  );
};

export default App;
