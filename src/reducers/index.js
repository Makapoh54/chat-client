import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';
import userInfo from './userInfo';
import chat from './chat';

const chatStatus = combineReducers({
  userInfo,
  users,
  messages,
  chat,
});

export default chatStatus;
