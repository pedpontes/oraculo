export type ChatModel = {
  id: string;
  messages: MessageModel[];
};

export type MessageModel = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatRequestModel = {
  id: string;
  message: string;
};
