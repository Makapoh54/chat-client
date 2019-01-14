import types from '../constants/actionTypes';
import chatStatuses from '../constants/chatStatuses';

const initialState = {
  status: chatStatuses.DISCONNECTED,
};

const chatStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.DISCONNECTED_FROM_CHAT:
    case types.CONNECTED_TO_CHAT:
      return { status: action.status };
    default:
      return state;
  }
};

export default chatStatus;
