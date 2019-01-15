import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from '../message/Message';
import './MessagesHistory.scss';

class MessagesHistory extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages } = this.props;
    return (
      <section className="messages-history">
        <ul>
          {messages.map(message => (
            <Message key={message.id} {...message} />
          ))}
        </ul>
        <div style={{ float: 'left', clear: 'both' }} ref={this.messagesEnd} />
      </section>
    );
  }
}

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
