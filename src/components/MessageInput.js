import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage } from '../actions';

const MessageInput = props => {
  const { addMessage } = props;
  return (
    <section id="new-message">
      <input
        onKeyPress={e => {
          if (e.key === 'Enter') {
            addMessage(e.target.value, 'Me');
            e.target.value = '';
          }
        }}
        type="text"
      />
    </section>
  );
};

MessageInput.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addMessage: message => {
    dispatch(addMessage(message));
  },
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(MessageInput);
