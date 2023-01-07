// 사용자가 비용에 대한 정보를 입력할 수 있는 컴포넌트
import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

import './NewExpense.css';

const NewExpense = (props) => {

    const [isAdding, setIsAdding] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData);
        setIsAdding(false);
    };

    const stopAddingHandler = () => {
        setIsAdding(false);
    };

    const newButtonClickHandler = () => {
        setIsAdding(true);
    };

    let showenComponent = <button onClick={newButtonClickHandler}>Add New Expense</button>;
    if (isAdding) {
        showenComponent = <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancelAdding={stopAddingHandler} />;
    }

    return (
        <div className="new-expense">
            {showenComponent}
        </div>
    );
}

export default NewExpense;
