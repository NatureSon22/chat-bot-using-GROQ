import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { ChatType } from "../App";

type ChatListProps = {
  chatList: ChatType[];
  chatListRef: React.RefObject<HTMLDivElement>
}

const ChatList = ({ chatList, chatListRef }: ChatListProps) => {
  return (
    <div ref={chatListRef} className="my-10 grid gap-14 place-self-start mx-auto max-w-[60em] w-[85%] sm:mt-20 sm:mb-40">
      {chatList.map((chat) => {
        return chat.type === "user" ? (
          <UserMessage key={chat.id} message={chat.message} />
        ) : (
          <BotMessage key={chat.id} message={chat.message} />
        );
      })}
    </div>
  );
};

export default ChatList;
