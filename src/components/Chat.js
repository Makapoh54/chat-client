import React from 'react';
import { connect } from 'react-redux';
import './Chat.scss';
import UserList from './UserList';
import MessagesHistory from './MessagesHistory';
import MessageInput from './MessageInput';
import chatStatuses from '../constants/chatStatuses';

class Chat extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { chat, history } = nextProps;
    if (chat.status === chatStatuses.DISCONNECTED || chat.status === chatStatuses.ERROR) {
      history.push('/');
    }
    return {};
  }
  render() {
    return (
      <div id="container">
        <UserList />
        <section id="main">
          <MessagesHistory />
          <MessageInput />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  {},
)(Chat);
