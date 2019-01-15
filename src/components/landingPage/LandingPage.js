import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LandingPage.scss';
import { connectToChatServer as connectToChatServerAction } from '../../actions';
import chatStatuses from '../../constants/chatStatuses';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      validationStatus: 'PROCESSING',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidUpdate() {
    const { chat, history } = this.props;
    if (chat.status === chatStatuses.CONNECTED) history.push('/chat');
  }

  handleChange({ currentTarget }) {
    const { value } = currentTarget;
    const { validationStatus } = value.length < 2 ? { validationStatus: 'ERROR' } : { validationStatus: 'SUCCESS' };
    this.setState({ username: value, validationStatus });
  }

  handleOnClick() {
    const { username } = this.state;
    this.setState({ validationStatus: 'PROCESSING' });
    this.props.connectToChatServer(username);
  }

  render() {
    const { validationStatus } = this.state;
    const buttonDisabled = validationStatus !== 'SUCCESS';
    return (
      <div className="login-form">
        <h2>Connect to Chat</h2>
        <div>
          <label className="username-label">Username: </label>
          <input
            type="text"
            className="username-input"
            name="username"
            onChange={this.handleChange}
            required
            placeholder="Min. length - 2"
          />
        </div>
        <button className="connect-button" disabled={buttonDisabled} onClick={this.handleOnClick}>
          Connect
        </button>
      </div>
    );
  }
}

LandingPage.propTypes = {
  connectToChatServer: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  connectToChatServer: connectToChatServerAction,
};

const mapStateToProps = state => ({
  chat: state.chat,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
