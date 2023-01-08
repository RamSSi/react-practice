import React from 'react';

import UserItem from './UserItem';

const UserList = (props) => {

    const handleSendDeletedUserData = userId => {
        props.onDeleteUser(userId);
    };

    return (
        <ul>
            {props.userList.map(user => 
                <UserItem 
                    onSendDeletedUserData={handleSendDeletedUserData}
                    key={user.id} 
                    userId={user.id} 
                    userName={user.name} 
                    userAge={user.age} 
                />)
            }
        </ul>
    );
}

export default UserList;