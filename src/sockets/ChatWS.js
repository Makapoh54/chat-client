import types from '../constants/actionTypes';
import { populateUsersList, messageReceived, disconnectedFromChat, connectedToChat } from '../actions';
import chatStatuses from '../constants/chatStatuses';

class ChatWebSocketConnection {
  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.status = chatStatuses.DISCONNECTED;
    this.socket = {};
    this.username = undefined;
  }

  connect(username) {
    this.socket = new WebSocket(this.url);
    this.username = username;
    this.socket.onopen = () => {
      this.status = chatStatuses.CONNECTED;
      this.dispatch(connectedToChat(chatStatuses.CONNECTED));
      this.socket.send(
        JSON.stringify({
          type: types.ADD_USER,
          username,
        }),
      );
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
    if (this.status === chatStatuses.DISCONNECTED) this.socket.close();
  }

  send(message) {
    if (this.status === chatStatuses.CONNECTED && this.socket.send) {
      this.socket.send(message);
    }
  }
}

export default ChatWebSocketConnection;
