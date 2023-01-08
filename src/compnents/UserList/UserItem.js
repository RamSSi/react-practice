import React from 'react';

import './UserItem.css';

const UserItem = (props) => {

    const handleUserItemClick = () => {
        props.onSendDeletedUserData(props.userId);
    };

    return (
        <li className="user-item" onClick={handleUserItemClick}>
            {`${props.userName} (${props.userAge} years old)`}
        </li>
    );
}

export default UserItem;