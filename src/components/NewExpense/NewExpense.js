// 사용자가 비용에 대한 정보를 입력할 수 있는 컴포넌트
import React from 'react';

import ExpenseForm from './ExpenseForm';

import './NewExpense.css';

const NewExpense = () => {
    return (
        <div className="new-expense">
            <ExpenseForm />
        </div>
    );
}

export default NewExpense;
