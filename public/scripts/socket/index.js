const { base64ToUint8Array } = require('../functions/index');
const { serverUrl } = require('../main/index');

let socket;

if (serverUrl.includes('localhost')) {
  socket = new WebSocket('ws://' + serverUrl + '/chat');
} else {
  socket = new WebSocket('wss://' + serverUrl + '/chat');
}

socket.onopen = function () {
  document.getElementById('status').innerText =
    'Conectado ao servidor WebSocket';
};

socket.onmessage = function (event) {
  try {
    const { data, type } = JSON.parse(event.data);

    const audioBytes = base64ToUint8Array(data.audio);
    const audioBlob = new Blob([audioBytes], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    const conversationList = document.getElementById('conversationList');

    const serverMsg = document.createElement('li');
    serverMsg.classList.add('server-msg');
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = audioUrl;
    serverMsg.appendChild(
      document.createTextNode(
        `Assistente: ${
          data?.messages?.length
            ? data.messages[data.messages.length - 1].content
            : ''
        }`
      )
    );
    serverMsg.appendChild(audioElement);
    conversationList.appendChild(serverMsg);
  } catch (error) {
    console.error('Erro ao processar a mensagem do servidor:', error);
  }
};
