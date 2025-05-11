import { ElevenLabzProtocols } from '@/services/protocols/elevenlabz/elevenlabz';
import { ElevenLabsClient } from 'elevenlabs';
import { TextToSpeechRequest } from 'elevenlabs/api';

export class ElevenLabzHelper implements ElevenLabzProtocols {
  private readonly elevenLabzApiKey: string;
  private readonly client: ElevenLabsClient;

  constructor() {
    this.elevenLabzApiKey = process.env.ELEVEN_LABZ_API_KEY || '';
    if (!this.elevenLabzApiKey) {
      throw new Error(
        '[ERROR] [ELEVEN_LABS] ELEVENLABZ_API_KEY is not defined'
      );
    }

    this.client = new ElevenLabsClient({
      apiKey: this.elevenLabzApiKey,
    });
  }

  async loadTTS(voiceId: string, req: TextToSpeechRequest): Promise<Buffer> {
    const result = await this.client.textToSpeech.convert(voiceId, req);

    if (result instanceof ReadableStream) {
      const reader = result.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;

      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }

      return Buffer.from(merged.buffer);
    }

    throw new Error('[ERROR] [ELEVEN_LABS] Unexpected response type');
  }
}
