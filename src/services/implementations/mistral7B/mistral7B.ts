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

    const payload = {
      dry_base: 1.78,
      messages,
      temperature: 0.7,
      max_tokens: -1,
      top_p: 0.95,
      top_k: 40,
      dry_allowed_length: 2,
      frequency_penalty: 0,
      repeat_penalty: 1,
      stream: false,
      timings_per_token: false,
      cache_prompt: false,
      xtc_threshold: 0.1,
    };

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
