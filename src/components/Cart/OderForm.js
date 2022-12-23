import React from "react";
import useValidate from "../Hooks/use_invalidate";

const OderForm = () => {
  const {
    value: enterdName,
    inValid: isNameInValid,
    getInput: onChangeHandler,
  } = useValidate((input) => (input.trim() === "" ? false : true));

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isNameInValid) {
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
