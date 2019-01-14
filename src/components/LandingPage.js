import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUserExists as checkUserExistsAction, connectToChatServer as connectToChatServerAction } from '../actions';

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
    const { userInfo, errorMessage, history } = nextProps;
    if (errorMessage) {
      return { errorMessage, validationStatus: 'ERROR' };
    }
    if (!userInfo.exists) {
      history.push('/chat');
      nextProps.connectToChatServer(userInfo.username);
    }
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
      <div>
        <h2>Login to Chat</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" onChange={this.handleChange} />
          <label>{errorMessage}</label>
        </div>
        <div className="form-group">
          <button disabled={buttonDisabled} onClick={this.handleOnClick}>
            Connect
          </button>
        </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
