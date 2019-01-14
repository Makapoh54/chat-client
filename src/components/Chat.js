import React from 'react';
import './Chat.scss';
import UserList from './UserList';
import MessagesHistory from './MessagesHistory';
import MessageInput from './MessageInput';

const Chat = () => (
  <div id="container">
    <UserList />
    <section id="main">
      <MessagesHistory />
      <MessageInput />
    </section>
  </div>
);

export default Chat;
