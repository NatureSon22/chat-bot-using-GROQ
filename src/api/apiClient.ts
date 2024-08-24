import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true,
});

const conversationHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are a helpful assistant that responds with markdown formatting. Have proper spacing",
  },
];

const getGroqChatCompletion = async (text: string) => {
  // Add the user's new message to the history
  conversationHistory.push({
    role: "user",
    content: text,
  });

  // Call the model with the entire conversation history
  const response = await groq.chat.completions.create({
    messages: conversationHistory,
    model: "llama3-8b-8192",
  });

  // Add the assistant's response to the history
  const assistantMessage = response.choices[0]?.message;
  if (assistantMessage) {
    conversationHistory.push(assistantMessage);
  }

  return response;
};

const generateText = async (prompt: string): Promise<string> => {
  const chatCompletion = await getGroqChatCompletion(prompt);
  return chatCompletion.choices[0]?.message?.content || "";
};

const clearConversationHistory = () => {
  conversationHistory.length = 0;
};

export { generateText, clearConversationHistory };
