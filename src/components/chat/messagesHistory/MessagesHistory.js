import React, { useEffect, useRef } from 'react';
import { useChatNewMessages } from '../../../hooks/chatHooks';
import Message from '../message/Message';
import './MessagesHistory.scss';

export default () => {
  const messagesEnd = useRef(null);
  const messages = useChatNewMessages();

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="messages-history">
      <ul>
        {messages.map((message, id) => {
          return <Message key={id} {...message} />;
        })}
      </ul>
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
    </section>
  );
};
