import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage as addMessageAction } from '../../../actions';
import './MessageInput.scss';

const MessageInput = ({ username, addMessage }) => (
  <section className="new-message">
    <input
      onKeyPress={e => {
        if (e.key === 'Enter' && e.target.value !== '') {
          addMessage(e.target.value, username);
          e.target.value = '';
        }
      }}
      type="text"
    />
  </section>
);

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  addMessage: addMessageAction,
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(MessageInput);
