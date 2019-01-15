import React from 'react';
import { connect } from 'react-redux';
import './Chat.scss';
import UserList from './userList/UserList';
import MessagesHistory from './messagesHistory/MessagesHistory';
import MessageInput from './messageInput/MessageInput';
import chatStatuses from '../../constants/chatStatuses';
import { addUser as addUserAction, dis } from '../../actions';

class Chat extends React.Component {
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
    const { username } = this.state;
    this.setState({ validationStatus: 'PROCESSING' });
    this.props.connectToChatServer(username);
  }

  render() {
    return (
      <div className="container">
        <UserList />
        <button className="disconnect-button" onClick={this.handleOnClick}>
          Disconnect
        </button>
        <section className="main">
          <MessagesHistory />
          <MessageInput />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
