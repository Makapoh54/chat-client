import types from '../constants/actionTypes';

const initialState = {
  exists: true,
  username: undefined,
};

const userInfo = (state = initialState, action) => {
  const { exists, username } = action;
  switch (action.type) {
    case types.CHECK_USER_SUCCESS:
      return { exists, username };
    default:
      return state;
  }
};

export default userInfo;
