import ReactMarkdown from "react-markdown";

const BotMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-fit max-w-[45em] leading-8 text-indigo-50 bg-indigo-950/70 px-5 py-3 rounded-lg">
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default BotMessage;
