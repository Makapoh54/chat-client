import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';
import userInfo from './userInfo';
import chat from './chat';
import actionTypes from '../constants/actionTypes';

const appReducer = combineReducers({
  userInfo,
  users,
  messages,
  chat,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.DISCONNECTED_FROM_CHAT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
