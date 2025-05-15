import 'module-alias/register';

import fastifyStatic from '@fastify/static';
import { fastifyWebsocket } from '@fastify/websocket';
import fastify from 'fastify';
import path from 'path';
import { ENV } from './config/config';
import websocketRoutes from './sockets/index';

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

app.listen({ port: Number(ENV.PORT) }, (err, address) => {
  if (err) {
    app.log.error('[Error] ' + err);
    return;
  }
  app.log.info(`[INFO] Server listening at ${address}`);
});
