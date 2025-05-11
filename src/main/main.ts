import { fastifyWebsocket } from '@fastify/websocket';
import fastify from 'fastify';
import { ENV } from './config/config';
import websocketRoutes from './sockets/index';

const app = fastify({ logger: true });

app.register(fastifyWebsocket);
app.register(websocketRoutes);

app.listen({ port: Number(ENV.PORT) }, (err, address) => {
  if (err) {
    app.log.error('[Error] ' + err);
    return;
  }
  app.log.info(`[INFO] Server listening at ${address}`);
});
