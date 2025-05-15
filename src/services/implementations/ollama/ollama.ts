import { ApiProtocols } from '@/services/protocols/axios/axios';
import {
  ChatCompletionResponseModel,
  ModelsChatCompletionOllamaRequest,
  ModelsChatCompletionOpenAi,
  OllamaAiProtocols,
} from '@/services/protocols/openai/openai';
import { randomUUID } from 'crypto';

export class OllamaHelper implements OllamaAiProtocols {
  private readonly baseApiUrl: string;
  constructor(private readonly axiosHelper: ApiProtocols) {
    this.baseApiUrl = 'http://ollama:11434/api/chat';
  }

  async loadChatCompletions(
    data: ModelsChatCompletionOllamaRequest
  ): Promise<ChatCompletionResponseModel> {
    const { messages, model } = data;

    const response = await this.axiosHelper.post(
      this.baseApiUrl,
      { model, messages, stream: true },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      }
    );

    const stream = response.data;
    let respostaFinal = '';

    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => {
        const lines = chunk.toString().split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            const content = json.message?.content || '';
            respostaFinal += content;
          } catch (err) {
            console.error('Erro ao interpretar JSON:', line);
          }
        }
      });

      stream.on('end', () => {
        resolve({
          id: randomUUID(),
          object: 'chat.completion',
          usage: {
            completion_tokens: 0,
            prompt_tokens: 0,
            total_tokens: 0,
          },
          model: model as ModelsChatCompletionOpenAi,
          created: Date.now(),
          choices: [
            {
              finish_reason: 'stop',
              index: 0,
              message: {
                role: 'assistant',
                content: respostaFinal,
                refusal: null,
                annotations: [],
              },
            },
          ],
        });
      });

      stream.on('error', (err: any) => {
        console.error('Erro no stream:', err);
        reject(err);
      });
    });
  }
}
