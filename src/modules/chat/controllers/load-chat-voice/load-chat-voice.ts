import { ChatRequestModel } from '@/domain/models/chat/chat';
import { WebSocketController } from '@/presentation/protocols/websocket-controller';
import { LoadChatVoice } from '../../use-cases/load-chat-voice/load-chat-voice';

export class LoadChatVoiceController implements WebSocketController {
  constructor(private readonly loadChatVoiceUseCase: LoadChatVoice) {}

  async handle(message: Buffer, socket: WebSocket): Promise<void> {
    try {
      const data: ChatRequestModel = JSON.parse(
        Buffer.from(message).toString()
      );

      if (!data) throw new Error('Invalid data');

      const response = await this.loadChatVoiceUseCase.execute({
        id: data.id,
        message: data.message,
        model: data.model,
      });

      socket.send(JSON.stringify(response));
    } catch (error) {
      if (error instanceof Error) {
        socket.send(
          JSON.stringify({
            error: error.message,
          })
        );
      }
    }
  }
}
