import { call, put } from 'redux-saga/effects';
import { fetchUserExists } from '../services/userApi';
import { storeCurrentUsername } from '../actions';
import { notify } from '../utils/notifier';
import notificationMessages from '../constants/notificationMessages';

export const connectToChatServer = socket =>
  function*(action) {
    try {
      const { data } = yield call(fetchUserExists, action.username);
      if (data.data.userExists) {
        notify(notificationMessages.NICKNAME_TAKEN);
      } else {
        yield put(storeCurrentUsername(action.username));
        socket.connect();
      }
    } catch (error) {
      notify(notificationMessages.SERVER_UNAVAILABLE);
    }
  };

export const disconnectFromChatServer = socket => () => socket.close();

export const disconnectedFromServer = () => {
  notify(notificationMessages.SERVER_UNAVAILABLE);
};
