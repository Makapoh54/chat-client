import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react-hooks';
import './LandingPage.scss';
import { connectToChatServer as connectToChatServerAction } from '../../actions';
import chatStatuses from '../../constants/chatStatuses';
import { useChatStatus } from '../../hooks/chatHooks';

function LandingPage(props) {
  const chatStatus = useChatStatus();
  const [validationStatus, setValidationStatus] = useState('PROCESSING');
  const [username, setUsername] = useState('PROCESSING');

  useEffect(() => {
    if (chatStatus === chatStatuses.CONNECTED) props.history.push('/chat');
  });

  function handleChange({ currentTarget }) {
    const { value } = currentTarget;
    const validationStatus = value.length < 2 ? 'ERROR' : 'SUCCESS';
    setValidationStatus(validationStatus);
    setUsername(value);
  }

  function handleOnClick() {
    this.props.connectToChatServer(username);
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

LandingPage.propTypes = {
  connectToChatServer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  connectToChatServer: connectToChatServerAction,
};

const mapStateToProps = state => ({
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
