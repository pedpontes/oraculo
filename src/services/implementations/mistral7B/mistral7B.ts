import { ENV } from '@/main/config/config';
import { ApiProtocols } from '@/services/protocols/axios/axios';
import {
  ChatCompletionResponseModel,
  ModelsChatCompletionOllamaRequest,
} from '@/services/protocols/openai/openai';

export class mistral7BHelper {
  private readonly baseApiUrl: string;
  constructor(private readonly axiosHelper: ApiProtocols) {
    this.baseApiUrl = ENV.mistralUrl;
  }

  async loadChatCompletions(
    data: ModelsChatCompletionOllamaRequest
  ): Promise<ChatCompletionResponseModel> {
    const { messages, model } = data;

    console.log('Request to mistral7B:', {
      model,
      messages,
    });

    const payload = { messages };

    const response = await this.axiosHelper.post(this.baseApiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = response.data;

    console.log('Response from mistral7B:', resData);

    return {
      id: resData.id,
      object: resData.object,
      created: resData.created,
      model: resData.model,
      usage: {
        completion_tokens: resData.usage.completion_tokens,
        prompt_tokens: resData.usage.prompt_tokens,
        total_tokens: resData.usage.total_tokens,
      },
      choices: resData.choices.map((choice: any, index: number) => ({
        finish_reason: choice.finish_reason,
        index: choice.index ?? index,
        message: {
          role: choice.message.role,
          content: choice.message.content,
          refusal: choice.message.refusal ?? null,
          annotations: choice.message.annotations ?? [],
        },
      })),
    };
  }
}
