import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserList = ({ users }) => (
  <aside id="user-list" className="user-list">
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  </aside>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(
  state => ({
    users: state.users,
  }),
  {},
)(UserList);
