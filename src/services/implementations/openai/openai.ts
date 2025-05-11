import { ENV } from '@/main/config/config';
import { ApiProtocols } from '@/services/protocols/axios/axios';
import {
  ChatCompletionRequestModel,
  ChatCompletionResponseModel,
  OpenAiProtocols,
} from '@/services/protocols/openai/openai';

export class OpenAiHelper implements OpenAiProtocols {
  apiKey: string;
  baseApiUrl: string;

  constructor(private readonly axiosHelper: ApiProtocols) {
    if (!ENV.openAi.baseApiUrl) {
      throw new Error(
        '[ERROR] [OPENAI] OpenAI API base URL not found in environment variables'
      );
    }
    if (!ENV.openAi.apiKey) {
      throw new Error(
        '[ERROR] [OPENAI] OpenAI API key not found in environment variables'
      );
    }

    this.baseApiUrl = ENV.openAi.baseApiUrl;
    this.apiKey = ENV.openAi.apiKey || '';
  }

  async loadChatCompletions(
    data: ChatCompletionRequestModel
  ): Promise<ChatCompletionResponseModel> {
    return await this.axiosHelper.post(
      this.baseApiUrl + '/chat/completions',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );
  }
}
