import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';

const MessagesHistory = ({ messages }) => (
  <section id="messages-list">
    <ul>
      {messages.map(message => (
        <Message key={message.id} {...message} />
      ))}
    </ul>
  </section>
);

MessagesHistory.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(
  state => ({
    messages: state.messages,
  }),
  {},
)(MessagesHistory);
