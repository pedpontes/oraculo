import { LoadChatVoiceController } from '@/modules/chat/controllers/load-chat-voice/load-chat-voice';
import { LoadChatVoiceUseCase } from '@/modules/chat/use-cases/load-chat-voice/load-chat-voice';
import { HumanizeChatCompletionUseCase } from '@/modules/completions/use-cases/humanize-chat-completion/humanize-chat-completion';
import { AxiosHelper } from '@/services/implementations/axios/axios';
import { OpenAiHelper } from '@/services/implementations/openai/openai';

export const makeLoadChatVoice = (): LoadChatVoiceController => {
  return new LoadChatVoiceController(
    new LoadChatVoiceUseCase(
      new HumanizeChatCompletionUseCase(new OpenAiHelper(new AxiosHelper()))
    )
  );
};
