import { ChatRequestModel } from '@/domain/models/chat/chat';
import { ChatState } from '@/main/states/chat-state.global';
import { HumanizeChatCompletion } from '@/modules/completions/use-cases/humanize-chat-completion/humanize-chat-completion';
import { TTS } from '@/modules/tts/use-cases/tts';

export interface LoadChatVoice {
  execute(data: ChatRequestModel): Promise<{
    type: string;
    data: {
      messages: Array<{ role: string; content: string }>;
      audio: string;
    };
  }>;
}

export class LoadChatVoiceUseCase implements LoadChatVoice {
  constructor(
    private readonly humanizeChatCompletionUseCase: HumanizeChatCompletion,
    private readonly TTSUseCase: TTS
  ) {}

  async execute(data: ChatRequestModel): Promise<{
    type: string;
    data: {
      messages: Array<{ role: string; content: string }>;
      audio: string;
    };
  }> {
    const chatHistory = ChatState.loadChat(data.id);
    ChatState.updateChat(data.id, {
      messages: [
        ...(chatHistory?.messages || []),
        { role: 'user', content: data.message.toString() },
      ],
    });

    const responseString = await this.humanizeChatCompletionUseCase.execute({
      id: data.id,
      message: data.message.toString(),
    });

    let bufferAudio: Buffer;

    try {
      bufferAudio = await this.TTSUseCase.execute(responseString);
    } catch (error) {
      bufferAudio = Buffer.from('');
    }

    ChatState.updateChat(data.id, {
      messages: [
        ...(ChatState.loadChat(data.id)?.messages || []),
        { role: 'assistant', content: responseString },
      ],
    });

    console.log(
      'Chat history after update:',
      JSON.stringify(ChatState.loadChat(data.id), null, 2)
    );

    return {
      type: 'audio_history_messages',
      data: {
        messages: ChatState.loadChat(data.id).messages,
        audio: bufferAudio.toString('base64'),
      },
    };
  }
}
