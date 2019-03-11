import { useState, useEffect } from 'react';
import ChatWS from '../sockets/ChatWS';

export function useChatStatus(friendID) {
  const [chatStatus, setChatStatus] = useState(null);

  function handleStatusChange(status) {
    setChatStatus(status);
  }

  useEffect(() => {
    ChatWS.subscribeToStatusChange(friendID, handleStatusChange);
    return () => {
      ChatWS.unsubscribeToStatusChange(friendID, handleStatusChange);
    };
  }, []);

  return chatStatus;
}

export function useConnectToChat() {
    return useEffect(() => {
        ChatWS.subscribeToStatusChange(friendID, handleStatusChange);
        return () => {
          ChatWS.unsubscribeToStatusChange(friendID, handleStatusChange);
        };
      });
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
}
