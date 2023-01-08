import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = props => {
	const [enteredUsername, setEnteredUserName] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
	const [error, setError] = useState(false);

	const addUserHandler = (event) => {
		event.preventDefault();
		if (!(enteredUsername.trim()) || !(enteredAge.trim())) {
			setError({
				title: "Invalid error",
				message: "이름과 나이를 입력해 주세요. (빈 칸을 채워 주세요.)"
			});
			return;
		}

		if (+(enteredAge.trim()) < 1) {
			setError({
				title: "Invalid age",
				message: "유효한 숫자를 입력해 주세요. (0보다 큰 수를 입력하세요.)"
			})
			return;
		}

		props.onAddUser(enteredUsername, enteredAge)
		setEnteredUserName("");
		setEnteredAge("");
	};

	const usernameChangeHandler = (event) => {
		setEnteredUserName(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};

	const errorHandler = () => {
		setError(null);
	};	

	return (
		<div>
			{error && 
				<ErrorModal 
					title={error.title} 
					message={error.message} 
					onConfirmError={errorHandler}
				/>}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">UserName</label>
					<input
						id="username"
						type="text"
						onChange={usernameChangeHandler}
						value={enteredUsername}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						onChange={ageChangeHandler}
						value={enteredAge}
					/>

					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

			export default AddUser;