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

    const prompt = messages
      .map((message) => '<im_start>' + message.content + '<im_end>')
      .join('\n');

    const payload = { prompt, temperature: 0.7, max_tokens: 2048 };

    const response = await this.axiosHelper.post(this.baseApiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = response.data;

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
