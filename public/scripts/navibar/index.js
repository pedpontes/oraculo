import { chatId } from '../main/index.js';

document.addEventListener('DOMContentLoaded', async function () {
  loadChatIdFromUrl();
  const navibar = document.querySelector('.navigation-lateral>ul');

  try {
    const response = await fetch('/api/chat');
    const data = await response.json();

    if (data && data.length > 0) {
      const chatList = data
        .map(
          (chat) => `
        <li class="nav-item">
          <a href="/?chatId=${chat.id}"><i class="fa-solid fa-comment"></i>${chat.id}</a>
        </li>
      `
        )
        .join('');

      navibar.innerHTML = chatList;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

async function loadChatIdFromUrl() {
  const conversationList = document.getElementById('conversationList');
  try {
    const response = await fetch(`/api/chat/${chatId}`);
    const data = await response.json();

    if (response.ok)
      if (data && data.length > 0) {
        const chat = data.messages
          .map((message) => {
            return `
            <li class="${message.role === 'user' ? 'user-msg' : 'server-msg'}">
                ${message.content}
            </li>
            `;
          })
          .join('');

        conversationList.innerHTML = chat;
      }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
