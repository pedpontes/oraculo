const serverUrl = document.location.hostname.includes('localhost')
  ? 'localhost:8080'
  : 'oraculo-ic.ddns.net';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const chatId = params.get('chatId');

  try {
    const response = await fetch(`${serverUrl}/chat/${chatId}`);
  } catch (error) {}
});

export { serverUrl };
