import types from '../constants/actionTypes';

const initialState = {
  exists: true,
};

const userInfo = (state = initialState, action) => {
  const { exists } = action;
  console.log('USERINFO', action);
  switch (action.type) {
    case types.CHECK_USER_SUCCESS:
      return { exists };
    default:
      return state;
  }
};

export default userInfo;
