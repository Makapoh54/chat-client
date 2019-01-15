import { takeEvery, all } from 'redux-saga/effects';
import types from '../constants/actionTypes';
import { connectToChatServer, disconnectedFromServer, disconnectFromChatServer } from './connection';
import { handleAddUser, handleAddMessage } from './chat';

const rootSaga = function* watchAll(params) {
  yield all([
    takeEvery(types.ADD_MESSAGE, handleAddMessage(params.socket)),
    takeEvery(types.ADD_USER, handleAddUser(params.socket)),
    takeEvery(types.CONNECT_TO_CHAT_SERVER, connectToChatServer(params.socket)),
    takeEvery(types.DISCONNECTED_FROM_CHAT, disconnectedFromServer),
    takeEvery(types.DISCONNECT_FROM_CHAT, disconnectFromChatServer(params.socket)),
  ]);
};

export default rootSaga;
