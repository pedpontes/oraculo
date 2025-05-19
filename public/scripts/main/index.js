export const serverUrl = document.location.hostname.includes('localhost')
  ? 'localhost:8080'
  : 'oraculo-ic.ddns.net';

export const chatId =
  new URLSearchParams(window.location.search).get('chatId') ||
  Math.floor(Math.random() * 1000000);
