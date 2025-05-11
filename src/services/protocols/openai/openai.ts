export type ChatCompletionRequestModel = {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string | string[];
};

export interface OpenAiProtocols {
  loadChatCompletions: (data: ChatCompletionRequestModel) => Promise<void>;
  //   loadImage: () => Promise<void>;
  //   loadAudio: () => Promise<void>;
}
