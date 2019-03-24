import React, { useEffect, useContext } from 'react';
import './Chat.scss';
import UserList from './userList/UserList';
import MessagesHistory from './messagesHistory/MessagesHistory';
import MessageInput from './messageInput/MessageInput';
import chatStatuses from '../../constants/chatStatuses';
import { useChatStatus } from '../../hooks/chatHooks';
import chatContext from '../../contexts/chatContext';
import types from '../../constants/actionTypes';

const Chat = props => {
  const { chat, username } = useContext(chatContext);
  const chatStatus = useChatStatus(chat);

  useEffect(() => {
    if (chatStatus === chatStatuses.DISCONNECTED || chatStatus === chatStatuses.ERROR) {
      props.history.push('/');
    }
  }, [chatStatus]);

  useEffect(() => {
    chat.send(
      JSON.stringify({
        type: types.ADD_USER,
        username: username,
      }),
    );
  }, []);

  return (
    <div className="container">
      <UserList />
      <button
        className="disconnect-button"
        onClick={() => {
          chat.close();
        }}
      >
        Disconnect
      </button>
      <section className="main">
        <MessagesHistory username={username} />
        <MessageInput username={username} />
      </section>
    </div>
  );
};

export default Chat;
