import types from '../constants/actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
    case types.ADD_MESSAGE:
      return [...state, { message: action.message, username: action.username, id: action.id }];
    default:
      return state;
  }
};

export default messages;
