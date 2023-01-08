import React from 'react';

import Card from '../UI/Card';
import NewUserForm from './NewUserForm';

const NewUser = (props) => {
    const handleAddedUserDataSend = newUserData => {
        props.onAddUser(newUserData);
    }

    return (
        <Card>
            <NewUserForm onSendAddedUserData={handleAddedUserDataSend} />
        </Card>
    );
}

export default NewUser;