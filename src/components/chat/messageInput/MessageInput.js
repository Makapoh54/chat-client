import React, { useContext } from 'react';
import chatContext from '../../../contexts/chatContext';
import types from '../../../constants/actionTypes';
import './MessageInput.scss';

export default () => {
  const { chat, username } = useContext(chatContext);

  return (
    <section className="new-message">
      <input
        onKeyPress={e => {
          if (e.key === 'Enter' && e.target.value !== '') {
            chat.send(JSON.stringify({ type: types.ADD_MESSAGE, message: e.target.value, username }));
            e.target.value = '';
          }
        }}
        type="text"
      />
    </section>
  );
};
