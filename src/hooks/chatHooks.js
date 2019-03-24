import { useState, useEffect, useContext } from 'react';
import { fetchUserExists } from '../services/userApi';
import { notify } from '../utils/notifier';
import notificationMessages from '../constants/notificationMessages';
import chatContext from '../contexts/chatContext';

export function useChatStatus(chat) {
  const [chatStatus, setChatStatus] = useState(null);

  function handleStatusChange({ detail: { status } }) {
    setChatStatus(status);
  }

  useEffect(() => {
    chat.subscribeToStatusChange(handleStatusChange);
    return () => {
      chat.unsubscribeToStatusChange(handleStatusChange);
    };
  }, []);

  return chatStatus;
}

export function useConnectToChat(setGlobalUsername, chat) {
  const [username, setUsername] = useState();
  const [connectionIntent, setConnectionIntent] = useState(false);

  useEffect(() => {
    const connect = async () => {
      try {
        const {
          data: { userExists },
        } = await fetchUserExists(username);
        if (userExists) {
          notify(notificationMessages.NICKNAME_TAKEN);
        } else {
          chat.connect();
          setGlobalUsername(username);
        }
      } catch (error) {
        notify(notificationMessages.NICKNAME_TAKEN);
      }
    };

    if (connectionIntent) connect(username);
    setConnectionIntent(false);
  }, [username, connectionIntent]);

  return {
    username,
    setUsername,
    connect: () => {
      setConnectionIntent(true);
    },
  };
}

export function useChatActiveUsersList() {
  const { chat } = useContext(chatContext);
  const [usersList, setUsersList] = useState([]);

  function handleUserListChange({ detail: { users } }) {
    setUsersList(users);
  }

  useEffect(() => {
    chat.subscribeToUserListChange(handleUserListChange);
    return () => {
      chat.unsubscribeToUserListChange(handleUserListChange);
    };
  }, []);

  return usersList;
}

export function useChatNewMessages() {
  const { chat, username } = useContext(chatContext);
  const [messages, setMessages] = useState([]);

  function handleMessageAdded({ detail: message }) {
    if (message.username === username) {
      message.username = 'Me';
    }
    setMessages(messages => [...messages, message]);
  }

  useEffect(() => {
    chat.subscribeToNewMessages(handleMessageAdded);
    return () => {
      chat.unsubscribeToNewMessages(handleMessageAdded);
    };
  }, []);

  return messages;
}
