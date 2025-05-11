import { TextToSpeechRequest } from 'elevenlabs/api';

export interface ElevenLabzProtocols {
  loadTTS(voiceId: string, req: TextToSpeechRequest): Promise<Buffer>;
}
