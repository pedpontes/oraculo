const serverPort = window.location.port || null;
export const serverUrl =
  window.location.hostname + (serverPort ? `:${serverPort}` : '');

export const chatId =
  new URLSearchParams(window.location.search).get('chatId') ||
  Math.floor(Math.random() * 1000000);
