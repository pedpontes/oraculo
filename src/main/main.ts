import 'module-alias/register';

import fastifyStatic from '@fastify/static';
import { fastifyWebsocket } from '@fastify/websocket';
import fastify from 'fastify';
import path from 'path';
import { ENV } from './config/config';
import websocketRoutes from './sockets/index';
import { ChatState } from './states/chat-state.global';

const app = fastify({ logger: true });

app.register(fastifyWebsocket);
app.register(websocketRoutes);

app.register(fastifyStatic, {
  root: path.join(__dirname, '../../public'),
  prefix: '/',
});

app.get('/', async (request, reply) => {
  return reply.sendFile('index.html');
});

app.get('/api/chat', async (request, reply) => {
  const chats: {
    id: string;
    messages: {
      role: string;
      content: string;
    }[];
  }[] = ChatState.loadAllChats();

  return reply.send({ data: chats, total: chats.length });
});

app.get('/api/chat/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const chat = ChatState.loadChat(id);
  if (!chat) {
    return reply.status(404).send({ message: 'Chat not found' });
  }
  return reply.send({ data: chat });
});

if (ENV.NODE_ENV == 'production') {
  app.listen({ port: Number(ENV.PORT), host: '0.0.0.0' }, (err, address) => {
    if (err) {
      app.log.error('[Error] ' + err);
      return;
    }
    app.log.info(`[INFO] Server listening at ${address}`);
  });
} else
  app.listen({ port: Number(ENV.PORT) }, (err, address) => {
    if (err) {
      app.log.error('[Error] ' + err);
      return;
    }
    app.log.info(`[INFO] Server listening at ${address}`);
  });
