import { ENV } from "@/main/config/config";
import { ApiProtocols } from "@/services/protocols/axios/axios";
import { ChatCompletionResponseModel, ModelsChatCompletionOllamaRequest } from "@/services/protocols/openai/openai";
import { randomUUID } from "crypto";

export class mistral7BHelper{

    private readonly baseApiUrl: string;
      constructor(private readonly axiosHelper: ApiProtocols) {
        this.baseApiUrl = ENV.mistralUrl;
      }

      async loadChatCompletions(
        data: ModelsChatCompletionOllamaRequest
      ): Promise<ChatCompletionResponseModel> {
        const { messages, model } = data;
        const response = await this.axiosHelper.post(
            this.baseApiUrl, {pergunta:JSON.stringify(messages)},
            {
                headers: {
                'Content-Type': 'application/json',
                },        
            }
        )
        console.log(response)
        return {
                  id: randomUUID(),
                  object: 'chat.completion',
                  usage: {
                    completion_tokens: 0,
                    prompt_tokens: 0,
                    total_tokens: 0,
                  },
                  model: model as any,
                  created: Date.now(),
                  choices: [
                    {
                      finish_reason: 'stop',
                      index: 0,
                      message: {
                        role: 'assistant',
                        content: response.data.resposta,
                        refusal: null,
                        annotations: [],
                      },
                    },
                  ],
                }
    }


}

