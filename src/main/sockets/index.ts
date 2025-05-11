import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.register(import('./chat/chat'), { prefix: '/chat' });
}
