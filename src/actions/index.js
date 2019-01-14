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

export const checkUserSuccess = exists => ({
  type: types.CHECK_USER_SUCCESS,
  exists,
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

// export const populateTableList = tables => ({
//   type: types.TABLE_LIST,
//   tables,
// });

// export const removeTable = id => ({
//   type: types.REMOVE_TABLE,
//   id,
// });

// export const tableRemoved = id => ({
//   type: types.TABLE_REMOVED,
//   id,
// });

// export const tableAdded = (afterId, id, name, participants) => ({
//   type: types.TABLE_ADDED,
//   afterId,
//   id,
//   name,
//   participants,
// });

// export const tableUpdated = (id, name, participants) => ({
//   type: types.TABLE_UPDATED,
//   id,
//   name,
//   participants,
// });
