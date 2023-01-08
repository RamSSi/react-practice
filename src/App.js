import React, { useState } from 'react';

import NewUser from './compnents/NewUser/NewUser';
import UserList from './compnents/UserList/UserList';
import Card from './compnents/UI/Card';

import './App.css';

const DUMMY_USERS = [
  {id: Math.random(), name: "아람", age: 26}, 
  {id: Math.random(), name: "성찬", age: 23},
];

function App() {
  const [users, setUsers] = useState(DUMMY_USERS);

  const handleUserAdd = user => {
    setUsers(prevUsers => [user, ...prevUsers]);
  };

  const handleUserDelete = userId => {
    setUsers(prevUsers => {
      const deletedUsers =  prevUsers.filter(user => user.id !== userId);
      return deletedUsers;
    })
  }

  let usersContent = <strong style={{ textAlign: 'center' }}>No users found. Maybe add one?</strong>
  if (users.length > 0) {
    usersContent = (
      <UserList userList={users} onDeleteUser={handleUserDelete} />
    )
  }

  return (
    <div>
      <NewUser onAddUser={handleUserAdd} />
      <Card>
        {usersContent}
      </Card>
    </div>
  );
}

export default App;
