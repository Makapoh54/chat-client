import types from '../constants/actionTypes';

let messageIdIncrement = 0;

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users,
});

export const addUser = username => ({
  type: types.ADD_USER,
  username,
});

export const checkUserExists = username => ({
  type: types.CHECK_USER_EXISTS,
  username,
});

export const checkUserSuccess = (exists, username) => ({
  type: types.CHECK_USER_SUCCESS,
  exists,
  username,
});

export const addMessage = (message, username) => ({
  type: types.ADD_MESSAGE,
  message,
  username,
  id: messageIdIncrement++,
});

export const messageReceived = (message, username) => ({
  type: types.MESSAGE_RECEIVED,
  message,
  username,
  id: messageIdIncrement++,
});

export const connectToChatServer = username => ({
  type: types.CONNECT_TO_CHAT_SERVER,
  username,
});
