import { WebSocket } from '@fastify/websocket';
import { Buffer } from 'buffer';

export interface WebSocketController {
  handle(message: Buffer, socket: WebSocket): Promise<void>;
}
