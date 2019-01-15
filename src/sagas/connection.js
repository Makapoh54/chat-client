import { call, put } from 'redux-saga/effects';
import { fetchUserExists } from '../services/userApi';
import { storeCurrentUsername } from '../actions';
import { notify } from '../utils/notifier';

export const connectToChatServer = socket =>
  function*(action) {
    const { data } = yield call(fetchUserExists, action.username);
    if (data.data.userExists) {
      notify('Failed to connect. Nickname already taken.');
    } else {
      yield put(storeCurrentUsername(action.username));
      socket.connect();
    }
  };

export const disconnectFromChatServer = socket => socket.close();

export const disconnectedFromServer = () => {
  notify('Server unavailable.');
};
