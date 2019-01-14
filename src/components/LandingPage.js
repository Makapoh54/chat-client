import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LandingPage.scss';
import { checkUserExists as checkUserExistsAction, connectToChatServer as connectToChatServerAction } from '../actions';
import chatStatuses from '../constants/chatStatuses';

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      errorMessage: undefined,
      validationStatus: 'PROCESSING',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { chat, userInfo, errorMessage, history } = nextProps;
    if (errorMessage) {
      return { errorMessage, validationStatus: 'ERROR' };
    }
    if (!userInfo.exists) {
      nextProps.connectToChatServer(userInfo.username);
    }
    if (chat.status === chatStatuses.CONNECTED) history.push('/chat');
    return {};
  }

  handleChange({ currentTarget }) {
    const { value } = currentTarget;
    const { errorMessage, validationStatus } =
      value.length < 2
        ? { errorMessage: 'Username should be longer then 2', validationStatus: 'ERROR' }
        : { errorMessage: undefined, validationStatus: 'SUCCESS' };
    this.setState({ username: value, errorMessage, validationStatus });
  }

  handleOnClick() {
    const { username } = this.state;
    this.setState({ validationStatus: 'PROCESSING' });
    this.props.checkUserExists(username);
  }

  render() {
    const { errorMessage, validationStatus } = this.state;
    const buttonDisabled = validationStatus !== 'SUCCESS';
    return (
      <div className="login-form">
        <h2>Connect to Chat</h2>
        <div>
          <label className="username-label">Username: </label>
          <input type="text" className="username-input" name="username" onChange={this.handleChange} />
        </div>
        <button className="connect-button" disabled={buttonDisabled} onClick={this.handleOnClick}>
          Connect
        </button>
      </div>
    );
  }
}

LandingPage.propTypes = {
  checkUserExists: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  checkUserExists: checkUserExistsAction,
  connectToChatServer: connectToChatServerAction,
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
