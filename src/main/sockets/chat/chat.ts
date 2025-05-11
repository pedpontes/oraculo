import { Buffer } from 'buffer';
import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', { websocket: true }, (socket) => {
    socket.on('message', (message: Buffer) => {
      const messageString = Buffer.from(message).toString();
      console.log('[WS] [CHAT] Mensagem recebida:', messageString);
    });

    socket.on('close', () => {
      console.log('[WS] [CHAT] Conexão fechada');
    });
  });
}
