import types from '../constants/actionTypes';
import { populateUsersList, messageReceived } from '../actions';

const setupSocket = dispatch => {
  const socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        username: 'user1234',
      }),
    );
  };

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.username));
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
