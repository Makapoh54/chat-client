import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';
import userInfo from './userInfo';

const chatStatus = combineReducers({
  userInfo,
  users,
  messages,
});

export default chatStatus;
