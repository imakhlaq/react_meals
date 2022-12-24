import React from "react";
import useValidate from "../Hooks/use_invalidate";
import classes from "./OderForm.module.css";
import { useCallback } from "react";

const OderForm = () => {
  const logicFun = useCallback(
    (input) => (input.trim() === "" ? false : true),
    []
  );

  const {
    value: enterdName,
    inValid: isNameInValid,
    getInput: onChangeHandler,
  } = useValidate(logicFun);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(isNameInValid, enterdName);
    if (isNameInValid) {
      return;
    }

    console.log("dadadadad");
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" onChange={onChangeHandler} />
      </div>
      <div>
        <label htmlFor="name">Email</label>
        <input type="email" />
      </div>
      <div>
        <label htmlFor="addresss">Address</label>
        <textarea name="address" id="address" cols="21" rows="3"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OderForm;
