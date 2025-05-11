export type ChatModel = {
  name: string;
  messages: MessageModel[];
};

export type MessageModel = {
  role: 'user' | 'assistant';
  content: string;
};
