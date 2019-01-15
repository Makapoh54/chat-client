import types from '../constants/actionTypes';
import { populateUsersList, messageReceived, disconnectedFromChat, connectedToChat } from '../actions';
import chatStatuses from '../constants/chatStatuses';

class ChatWebSocketConnection {
  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.status = chatStatuses.DISCONNECTED;
    this.socket = {};
  }

  connect() {
    if (this.status === chatStatuses.PENDING) return;
    this.socket = new WebSocket(this.url);
    this.status = chatStatuses.PENDING;
    this.socket.onopen = () => {
      this.status = chatStatuses.CONNECTED;
      this.dispatch(connectedToChat(chatStatuses.CONNECTED));
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case types.USERS_LIST:
          this.dispatch(populateUsersList(data.users));
          break;
        case types.ADD_MESSAGE:
          this.dispatch(messageReceived(data.message, data.username));
          break;
        default:
          break;
      }
    };

    this.socket.onclose = () => {
      this.status = chatStatuses.DISCONNECTED;
      this.dispatch(disconnectedFromChat(chatStatuses.DISCONNECTED));
    };

    this.socket.onerror = () => {
      this.status = chatStatuses.ERROR;
      this.dispatch(disconnectedFromChat(chatStatuses.ERROR));
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
}

export default ChatWebSocketConnection;
