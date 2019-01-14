import { takeEvery, all, call, put } from 'redux-saga/effects';
import { fetchUserExists } from '../services/userApi';
import { checkUserSuccess } from '../actions';
import types from '../constants/actionTypes';

const rootSaga = function* watchAll(params) {
  yield all([
    takeEvery(types.CHECK_USER_EXISTS, checkUserExists),
    takeEvery(types.ADD_MESSAGE, handleAddMessage(params.socket)),
    takeEvery(types.CONNECT_TO_CHAT_SERVER, connectToChatServer(params.socket)),
  ]);
};

const connectToChatServer = socket => action => {
  socket.connect(action.username);
};

const handleAddMessage = socket => action => {
  socket.send(JSON.stringify({ ...action, username: socket.username }));
};

const checkUserExists = function*(action) {
  const { data } = yield call(fetchUserExists, action.username);
  yield put(checkUserSuccess(data.data.userExists, action.username));
};

export default rootSaga;
