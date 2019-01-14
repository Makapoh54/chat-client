import types from '../constants/actionTypes';

const users = (state = [], action) => {
  const { users } = action;
  switch (action.type) {
    case types.USERS_LIST:
      return [...users];
    default:
      return state;
  }
};

export default users;
