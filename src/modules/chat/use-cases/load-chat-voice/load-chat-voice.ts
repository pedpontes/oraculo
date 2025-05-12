import { ChatRequestModel } from '@/domain/models/chat/chat';
import { ChatState } from '@/main/states/chat-state.global';
import { HumanizeChatCompletion } from '@/modules/completions/use-cases/humanize-chat-completion/humanize-chat-completion';
import { TTS } from '@/modules/tts/use-cases/tts';

export interface LoadChatVoice {
  execute(data: ChatRequestModel): Promise<Buffer>;
}

export class LoadChatVoiceUseCase implements LoadChatVoice {
  constructor(
    private readonly humanizeChatCompletionUseCase: HumanizeChatCompletion,
    private readonly TTSUseCase: TTS
  ) {}

  async execute(data: ChatRequestModel): Promise<Buffer> {
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

    const bufferAudio = await this.TTSUseCase.execute(responseString);

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

    // return Buffer.from(JSON.stringify(ChatState.loadChat(data.id).messages));
    return bufferAudio;
  }
}
