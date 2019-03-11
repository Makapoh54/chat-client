import types from '../constants/actionTypes';
import { populateUsersList, messageReceived, disconnectedFromChat, connectedToChat } from '../actions';
import chatStatuses from '../constants/chatStatuses';

class ChatWebSocketConnection {
  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.status = chatStatuses.DISCONNECTED;
    this.socket = {};
    this.eventEmitter = new EventTarget();
  }

  connect() {
    if (this.status === chatStatuses.PENDING) return;
    this.socket = new WebSocket(this.url);
    this.status = chatStatuses.PENDING;
    this.socket.onopen = () => {
      this.status = chatStatuses.CONNECTED;
      this.dispatch(connectedToChat());
      this.eventEmitter.dispatchEvent(new CustomEvent('CHAT_STATUS', { status: this.status }));
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case types.USERS_LIST:
          this.dispatch(populateUsersList(data.users));
          this.eventEmitter.dispatchEvent(new CustomEvent('USERS_LIST', { users: data.users }));
          break;
        case types.ADD_MESSAGE:
          this.dispatch(messageReceived(data.message, data.username));
          this.eventEmitter.dispatchEvent(new CustomEvent('NEW_MESSAGE', { users: data.users }));
          break;
        default:
          break;
      }
    };

    this.socket.onclose = () => {
      this.status = chatStatuses.DISCONNECTED;
      this.dispatch(disconnectedFromChat(chatStatuses.DISCONNECTED));
      this.eventEmitter.dispatchEvent(new CustomEvent('CHAT_STATUS', { status: this.status }));
    };

    this.socket.onerror = () => {
      this.status = chatStatuses.ERROR;
      this.dispatch(disconnectedFromChat(chatStatuses.ERROR));
      this.eventEmitter.dispatchEvent(new CustomEvent('CHAT_STATUS', { status: this.status }));
    };
  }

  close() {
    if (this.status !== chatStatuses.DISCONNECTED) this.socket.close();
  }

  send(message) {
    if (this.status === chatStatuses.CONNECTED && this.socket.send) {
      this.socket.send(message);
    }
  }

  subscribeToNewMessages(handleNewMessage) {
    this.eventEmitter.addEventListener('NEW_MESSAGE', handleNewMessage);
  }

  unsubscribeToNewMessages(handleNewMessage) {
    this.eventEmitter.removeEventListener('NEW_MESSAGE', handleNewMessage);
  }

  subscribeToStatusChange(handleStatusChange) {
    this.eventEmitter.addEventListener('CHAT_STATUS', handleStatusChange);
  }

  unsubscribeToStatusChange(handleStatusChange) {
    this.eventEmitter.removeEventListener('CHAT_STATUS', handleStatusChange);
  }

  subscribeToUserListChange(handleUserListChange) {
    this.eventEmitter.addEventListener('USERS_LIST', handleUserListChange);
  }

  unsubscribeToUserListChange(handleUserListChange) {
    this.eventEmitter.removeEventListener('USERS_LIST', handleUserListChange);
  }
}

export default ChatWebSocketConnection;
