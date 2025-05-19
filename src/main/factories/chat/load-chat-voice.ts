import { LoadChatVoiceController } from '@/modules/chat/controllers/load-chat-voice/load-chat-voice';
import { LoadChatVoiceUseCase } from '@/modules/chat/use-cases/load-chat-voice/load-chat-voice';
import { HumanizeChatCompletionUseCase } from '@/modules/completions/use-cases/humanize-chat-completion/humanize-chat-completion';
import { SelectEngineUseCase } from '@/modules/completions/use-cases/select-engine/select-engine';
import { TTSUseCase } from '@/modules/tts/use-cases/tts';
import { AxiosHelper } from '@/services/implementations/axios/axios';
import { ElevenLabzHelper } from '@/services/implementations/elevenlabz/elevenlabz';
import { mistral7BHelper } from '@/services/implementations/mistral7B/mistral7B';
import { OllamaHelper } from '@/services/implementations/ollama/ollama';
import { OpenAiHelper } from '@/services/implementations/openai/openai';

export const makeLoadChatVoice = (): LoadChatVoiceController => {
  return new LoadChatVoiceController(
    new LoadChatVoiceUseCase(
      new HumanizeChatCompletionUseCase(
        new SelectEngineUseCase(
          new OpenAiHelper(new AxiosHelper()),
          new OllamaHelper(new AxiosHelper()),
          new mistral7BHelper(new AxiosHelper())
        )
      ),
      new TTSUseCase(new ElevenLabzHelper())
    )
  );
};
