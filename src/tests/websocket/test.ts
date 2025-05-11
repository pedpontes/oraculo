import { ChatRequestModel, MessageModel } from '@/domain/models/chat/chat';
import * as readline from 'readline';

const ws = new WebSocket('ws://localhost:8080/chat');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ws.onopen = () => {
  console.log('🟢 Conectado! Escreva mensagem e aperte enter para enviar.');

  rl.on('line', (messageInput) => {
    const message: ChatRequestModel = {
      id: '123456',
      message: messageInput,
    };

    ws.send(JSON.stringify(message));
    console.log('📤 Mensagem enviada:', message);
  });
};

ws.onmessage = async (event) => {
  const blob = new Blob([event.data]);
  const content: MessageModel[] = JSON.parse(await blob.text());

  console.log(
    '📩 Resposta do servidor:',
    content[content.length - 1]?.content ?? content
  );
};

ws.onerror = (err) => {
  console.error('❌ Erro:', err);
};

ws.onclose = () => {
  console.log('🔴 Conexão encerrada.');
  rl.close();
};
