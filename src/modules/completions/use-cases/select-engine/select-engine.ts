import { mistral7BHelper } from '@/services/implementations/mistral7B/mistral7B';
import {
  ChatCompletionRequestModel,
  ChatCompletionResponseModel,
  OllamaAiProtocols,
  OpenAiProtocols,
} from '@/services/protocols/openai/openai';

export interface SelectEngine {
  execute(
    data: ChatCompletionRequestModel
  ): Promise<ChatCompletionResponseModel>;
}

export class SelectEngineUseCase implements SelectEngine {
  constructor(
    private readonly openAiHelper: OpenAiProtocols,
    private readonly ollamaHelper: OllamaAiProtocols,
    private readonly mistral7B: mistral7BHelper
  ) {}

  async execute(
    data: ChatCompletionRequestModel
  ): Promise<ChatCompletionResponseModel> {
    if (data.model == 'openchat') {
      return await this.ollamaHelper.loadChatCompletions({
        messages: data.messages,
        model: data.model,
      });
    } else if (data.model == 'openai')
      return await this.openAiHelper.loadChatCompletions(data);
    else if(data.model == 'mistral7B'){
      return await this.mistral7B.loadChatCompletions(data);    
    }else{
      throw new Error('Model not supported');
    }
  }
}
