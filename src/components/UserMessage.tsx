const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-fit max-w-[45em] ml-auto text-indigo-50 bg-indigo-950/30 flex items-start px-5 py-3 rounded-lg">
      {message}
    </div>
  );
};

export default UserMessage;
