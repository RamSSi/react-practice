import React, { useState } from 'react';

import Button from '../UI/Button';

import './NewUserForm.css';

const NewUserForm = (props) => {
    const [userName, setUserName] = useState("");
    const [userAge, setUserAge] = useState("");

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleUserAgeChange = (e) => {
        setUserAge(e.target.value);
    }

    const handleUserFormSubmit = (e) => {
        e.preventDefault();

        const newUserData = {
            id: Math.random(),
            name: userName,
            age: userAge
        };

        // List 에 추가하는 로직
        props.onSendAddedUserData(newUserData);

        setUserName("");
        setUserAge("");
    }

    return (
        <form onSubmit={handleUserFormSubmit}>
            <div className="new-user__controls">
                <div className="new-user__control">
                    <label htmlFor="user-name__input">Username</label>
                    <input type="text" id="user-name__input" value={userName} onChange={handleUserNameChange} />
                </div>
                <div className="new-user__control">
                    <label htmlFor="user-age__input">Age(Years)</label>
                    <input type="number" min="0" max="150" value={userAge} id="user-age__input" onChange={handleUserAgeChange} />
                </div>
            </div>
            <div className="new-user__actions">
                <Button type="submit">Add User</Button>
            </div>
        </form>
    );
}

export default NewUserForm;