import React from 'react';
import { useState, useEffect, useContext } from 'react';
import chatStatuses from '../../constants/chatStatuses';
import { useChatStatus, useConnectToChat } from '../../hooks/chatHooks';
import chatContext from '../../contexts/chatContext';

import './LandingPage.scss';

export default function LandingPage(props) {
  const { chat, setUsername: setGlobalUsername } = useContext(chatContext);
  const [validationStatus, setValidationStatus] = useState('PROCESSING');
  const chatStatus = useChatStatus(chat);
  const { setUsername, connect } = useConnectToChat(setGlobalUsername, chat);
  useEffect(() => {
    if (chatStatus === chatStatuses.CONNECTED) props.history.push('/chat');
  }, [chatStatus]);

  function handleChange({ currentTarget }) {
    const { value } = currentTarget;
    const validationStatus = value.length < 2 ? 'ERROR' : 'SUCCESS';
    setValidationStatus(validationStatus);
    setUsername(value);
  }

  function handleOnClick() {
    connect();
  }

  return (
    <div className="login-form">
      <h2>Connect to Chat</h2>
      <div>
        <label className="username-label">Username: </label>
        <input
          type="text"
          className="username-input"
          name="username"
          onChange={handleChange}
          required
          placeholder="Min. length - 2"
        />
      </div>
      <button className="connect-button" disabled={validationStatus !== 'SUCCESS'} onClick={handleOnClick}>
        Connect
      </button>
    </div>
  );
}
