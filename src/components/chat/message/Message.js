import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, username }) => (
  <p>
    <i>{username}</i>: {message}
  </p>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Message;
