import { ChatState } from '@/main/states/chat-state.global';
import { ModelsChatCompletion } from '@/services/protocols/openai/openai';
import { SelectEngine } from '../select-engine/select-engine';
import { humanizeChatCompletionPrompt } from './humanize-chat-completion-prompt';

export interface HumanizeChatCompletion {
  execute(
    data: { id: string; message: string },
    model: 'openchat' | 'openai'
  ): Promise<string>;
}

export class HumanizeChatCompletionUseCase implements HumanizeChatCompletion {
  constructor(private readonly selectEngineUseCase: SelectEngine) {}

  async execute(
    data: { id: string; message: string },
    model: ModelsChatCompletion
  ): Promise<string> {
    const messageSend: {
      role: 'user' | 'assistant' | 'system';
      content: string;
    }[] = [
      ...(ChatState.loadChat(data.id)?.messages || []),
      humanizeChatCompletionPrompt,
      {
        role: 'user',
        content: data.message,
      },
    ];

    try {
      const response = await this.selectEngineUseCase.execute({
        model,
        messages: messageSend,
        max_completion_tokens: 1000,
        n: 1,
        temperature: 0.7,
        modalities: ['text'],
      });

      console.log('Response from CHAT:', JSON.stringify(response, null, 2));

      return response.choices[0].message.content;
    } catch (error: any) {
      throw new Error('[ERROR] [CHAT_COMPLETION] ' + error.message);
    }
  }
}
