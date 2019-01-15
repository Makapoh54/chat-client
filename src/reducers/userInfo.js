import types from '../constants/actionTypes';

const initialState = {
  username: undefined,
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_CURRENT_USERNAME:
      return { username: action.username };
    default:
      return state;
  }
};

export default userInfo;
