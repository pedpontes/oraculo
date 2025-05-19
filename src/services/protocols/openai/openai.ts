export type ChatCompletionRequestModel = {
  model: ModelsChatCompletion;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  max_completion_tokens?: number;
  modalities?: ModalitiesChatCompletionOpenAi[];
  n?: number;
  presence_penalty?: number;
  reasoning_effort?: ReasoingEffortChatCompletionOpenAi;
  response_format?: ResponseFormatChatCompletionOpenAi;
  stream?: boolean;
};

export type ChatCompletionResponseModel = {
  id: string;
  object: string;
  created: number;
  model: ModelsChatCompletion;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal?: null;
      annotations: Array<any>;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

type ResponseFormatChatCompletionOpenAi = Record<string, any>;
type ReasoingEffortChatCompletionOpenAi = 'low' | 'medium' | 'high';
type ModalitiesChatCompletionOpenAi = 'text' | 'audio';
export type ModelsChatCompletion = 'openai' | 'openchat';

export type ModelsChatCompletionOllamaRequest = {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  model?: ModelsChatCompletion;
};

export type ModelsChatCompletionOllamaResponse = {
  model: ModelsChatCompletion;
  messages: {
    role: string;
    content: string;
    refusal?: null;
    annotations: Array<any>;
  };
  created_at: number;
};

export interface OpenAiProtocols {
  loadChatCompletions(
    data: ChatCompletionRequestModel
  ): Promise<ChatCompletionResponseModel>;
  //   loadImage: () => Promise<void>;
  //   loadAudio: () => Promise<void>;
}
export interface OllamaAiProtocols {
  loadChatCompletions(
    data: ModelsChatCompletionOllamaRequest
  ): Promise<ChatCompletionResponseModel>;
  //   loadImage: () => Promise<void>;
  //   loadAudio: () => Promise<void>;
}
