import types from '../constants/actionTypes';

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users,
});

export const addUser = username => ({
  type: types.ADD_USER,
  username,
});

export const storeCurrentUsername = username => ({
  type: types.STORE_CURRENT_USERNAME,
  username,
});

export const addMessage = (message, username) => ({
  type: types.ADD_MESSAGE,
  message,
  username,
});

export const messageReceived = (message, username) => ({
  type: types.MESSAGE_RECEIVED,
  message,
  username,
});

export const connectToChatServer = (username, status) => ({
  type: types.CONNECT_TO_CHAT_SERVER,
  username,
  status,
});

export const disconnectFromChatServer = () => ({
  type: types.DISCONNECT_FROM_CHAT,
});

export const disconnectedFromChat = status => ({
  type: types.DISCONNECTED_FROM_CHAT,
  status,
});

export const connectedToChat = status => ({
  type: types.CONNECTED_TO_CHAT,
  status,
});
