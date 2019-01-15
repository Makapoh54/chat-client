import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage as addMessageAction } from '../../../actions';
import './MessageInput.scss';

const MessageInput = props => (
  <section className="new-message">
    <input
      onKeyPress={e => {
        if (e.key === 'Enter' && e.target.value !== '') {
          props.addMessage(e.target.value, 'Me');
          e.target.value = '';
        }
      }}
      type="text"
    />
  </section>
);

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addMessage: addMessageAction,
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(MessageInput);
