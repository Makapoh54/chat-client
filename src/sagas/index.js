import { takeEvery, all, call, put } from 'redux-saga/effects';
import { fetchUserExists } from '../services/userApi';
import { checkUserSuccess } from '../actions';
import types from '../constants/actionTypes';

const rootSaga = function* watchAll(params) {
  yield all([
    takeEvery(types.CHECK_USER_EXISTS, checkUserExists),
    takeEvery(types.ADD_MESSAGE, handleAddMessage(params.socket)),
    takeEvery(types.ADD_USER, handleAddUser(params.socket)),
  ]);
};

const handleAddMessage = socket => action => {
  console.log(action);
  socket.send(JSON.stringify(action));
};

const handleAddUser = socket => action => {
  console.log(action);
  socket.send(JSON.stringify(action));
};

const checkUserExists = function*(action) {
  console.log('checkUserExists', action);
  const { exists } = yield call(fetchUserExists, action.userId);
  console.log(exists);
  yield put(checkUserSuccess(exists));
};

export default rootSaga;
