import { ElevenLabzProtocols } from '@/services/protocols/elevenlabz/elevenlabz';
import fs from 'fs';
import path from 'path';

export interface TTS {
  execute(text: string): Promise<Buffer>;
}

export class TTSUseCase implements TTS {
  #voiceId = 'EXAVITQu4vr4xnSDxMaL';

  constructor(private readonly elevenLabzHelper: ElevenLabzProtocols) {}

  async execute(text: string): Promise<Buffer> {
    try {
      const response = await this.elevenLabzHelper.loadTTS(this.#voiceId, {
        text,
        output_format: 'mp3_22050_32',
      });

      const tmpDir = path.resolve(__dirname, '../../../../tmp/');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      const filePath = path.join(tmpDir, `${Date.now()}.mp3`);
      fs.writeFileSync(filePath, response);

      return response;
    } catch (error) {
      console.error('[ERROR] [ELEVEN_LABS] ', error);
      throw new Error('[ERROR] [ELEVEN_LABS] ' + error);
    }
  }
}
