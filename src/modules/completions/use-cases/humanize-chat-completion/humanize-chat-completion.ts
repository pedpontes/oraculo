import { ChatState } from '@/main/states/chat-state.global';
import { SelectEngine } from '../select-engine/select-engine';
import { humanizeChatCompletionPrompt } from './humanize-chat-completion-prompt';

export interface HumanizeChatCompletion {
  execute(data: { id: string; message: string }): Promise<string>;
}

export class HumanizeChatCompletionUseCase implements HumanizeChatCompletion {
  constructor(private readonly selectEngineUseCase: SelectEngine) {}

  async execute(data: { id: string; message: string }): Promise<string> {
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
        model: 'openchat',
        messages: messageSend,
        max_completion_tokens: 1000,
        n: 1,
        temperature: 0.7,
        modalities: ['text'],
      });

      console.log('Response from OpenAI:', JSON.stringify(response, null, 2));

      return response.choices[0].message.content;
    } catch (error: any) {
      throw new Error('[ERROR] [OPENAI] ' + error.message);
    }
  }
}
