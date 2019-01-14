import types from '../constants/actionTypes';
import { populateUsersList, messageReceived } from '../actions';

const STATUS_CONNECTED = 'CONNECTED';
const STATUS_NOT_CONNECTED = 'CONNECTED';

class ChatWebSocketConnection {
  constructor(url, dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.status = STATUS_NOT_CONNECTED;
    this.socket = {};
    this.username = undefined;
  }

  connect(username) {
    this.socket = new WebSocket(this.url);
    this.status = STATUS_CONNECTED;
    this.username = username;
    this.socket.onopen = () => {
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
  }

  send(message) {
    if (this.status === STATUS_CONNECTED && this.socket.send) {
      this.socket.send(message);
    }
  }
}

export default ChatWebSocketConnection;
