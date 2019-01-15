import React from 'react';
import { connect } from 'react-redux';
import './Chat.scss';
import UserList from './userList/UserList';
import MessagesHistory from './messagesHistory/MessagesHistory';
import MessageInput from './messageInput/MessageInput';
import chatStatuses from '../../constants/chatStatuses';
import { addUser as addUserAction, disconnectFromChatServer as disconnectFromChatServerAction } from '../../actions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidUpdate() {
    const { chat, history } = this.props;
    if (chat.status === chatStatuses.DISCONNECTED || chat.status === chatStatuses.ERROR) {
      history.push('/');
    }
  }

  componentDidMount() {
    this.props.addUser(this.props.userInfo.username);
  }

  handleOnClick() {
    this.props.disconnectFromChatServer();
  }

  render() {
    return (
      <div className="container">
        <UserList />
        <button className="disconnect-button" onClick={this.handleOnClick}>
          Disconnect
        </button>
        <section className="main">
          <MessagesHistory username={this.props.userInfo.username} />
          <MessageInput username={this.props.userInfo.username} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  userInfo: state.userInfo,
});

const mapDispatchToProps = {
  addUser: addUserAction,
  disconnectFromChatServer: disconnectFromChatServerAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
