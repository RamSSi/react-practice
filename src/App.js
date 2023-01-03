import React, { useState } from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const DUMMY_EXPENSES = [{
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2022, 12, 26)
},
{
    id: "e2",
    title: "Car Insurance",
    amount: 799.42,
    date: new Date(2022, 3, 14)
},
{
    id: "e3",
    title: "New TV",
    amount: 450,
    date: new Date(2021, 1, 7)
},
{
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 294.67,
    date: new Date(2022, 5, 20)
},
];

function App() {
    
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    const addExpenseHandler = expense => {
        setExpenses(prevExpenses => [expense, ...prevExpenses]);
    };

    // return React.createElement(
    //     'div',
    //     {},
    //     React.createElement('h2', {}, "Let's get started!"),
    //     React.createElement(Expenses, { items: expenses })
    // );

    return ( 
        <div>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </div>
    );
}

export default App;
