import React, { useRef, useState } from "react";

import Input from "../../UI/Input/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const enteredAmount = +amountInputRef.current.value;
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    amountInputRef.current.value = 1;
    props.onAddToCart(enteredAmount);
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>유효한 숫자를 입력해 주세요. (1 ~ 5)</p>}
    </form>
  );
};

export default MealItemForm;
