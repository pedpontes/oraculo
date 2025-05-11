import { MessageModel } from '@/domain/models/chat/chat';

export type ChatsGlobalState = {
  [key: string]: {
    messages: MessageModel[];
  };
};

const chatsGlobalState: ChatsGlobalState = {};

export class ChatState {
  static loadChat(id: string) {
    return chatsGlobalState[id];
  }

  static updateChat(id: string, chat: { messages: MessageModel[] }) {
    chatsGlobalState[id] = chat;
    return chatsGlobalState[id];
  }

  static deleteChat(id: string) {
    delete chatsGlobalState[id];
  }
}
