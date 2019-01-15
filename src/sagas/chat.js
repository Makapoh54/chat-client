import types from '../constants/actionTypes';

export const handleAddUser = socket => action => {
  socket.send(
    JSON.stringify({
      type: types.ADD_USER,
      username: action.username,
    }),
  );
};

export const handleAddMessage = socket => action => {
  socket.send(JSON.stringify({ ...action, username: socket.username }));
};
