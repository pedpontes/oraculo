const ws = new WebSocket('ws://localhost:8080/chat');

ws.onopen = () => {
  console.log('🟢 Conectado!');
  ws.send('Mensagem de teste do cliente');
};

ws.onmessage = (event) => {
  console.log('📩 Resposta do servidor:', event.data);
};

ws.onerror = (err) => {
  console.error('❌ Erro:', err);
};
