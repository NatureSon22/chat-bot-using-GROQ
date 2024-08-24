import { FaLocationArrow } from "react-icons/fa";
import { ChatType } from "../App";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";

type ChatInputProps = {
  setChatList: React.Dispatch<React.SetStateAction<ChatType[]>>;
  slideEnd: () => void;
};

const ChatInput = ({ setChatList, slideEnd }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");
  const { mutate } = useMutation({
    mutationFn: apiClient.generateText,
    onSuccess: (data) => {
      const newChat: ChatType = {
        id: crypto.randomUUID(),
        message: data,
        type: "bot",
      };
      setChatList((prev) => [...prev, newChat]);
      slideEnd();
    },
  });

  const handleGenerateText = () => {
    mutate(input);
  };

  const sendMessage = () => {
    const newChat: ChatType = {
      id: crypto.randomUUID(),
      message: input,
      type: "user",
    };

    setChatList((prev) => [...prev, newChat]);
    setInput("");
    handleGenerateText();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-[60em] w-[85%] bg-indigo-800 fixed bottom-0 py-7 mx-auto">
      <div className="flex  items-center border border-indigo-500 rounded-lg px-5 py-4 gap-10">
        <textarea
          rows={1}
          className="w-full outline-none bg-indigo-800 text-white placeholder:text-indigo-300 resize-none"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          className="bg-indigo-950 px-5 py-4 rounded-lg text-indigo-200 border border-indigo-950 hover:border-indigo-200 transition-all duration-200"
          onClick={sendMessage}
        >
          <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
