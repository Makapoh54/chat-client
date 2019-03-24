import React from 'react';
import { useChatActiveUsersList } from '../../../hooks/chatHooks';
import './UserList.scss';

const UserList = () => {
  const users = useChatActiveUsersList();
  return (
    <aside className="user-list">
      <label>User List: </label>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </aside>
  );
};

export default UserList;
