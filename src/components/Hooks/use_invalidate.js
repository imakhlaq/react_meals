import React, { useReducer } from "react";

const reducerFn = (prevState, action) => {
  if (action.type === "USER_INP") {
    return {
      ...prevState,
      inputData: action.entertedData,
    };
  }

  if (action.type === "INVALID") {
    return {
      ...prevState,
      isInvalid: true,
    };
  }
  if (action.type === "CLEAR") {
    return {
      ...prevState,
      isInvalid: false,
    };
  }
  return {
    inputData: "",
    isInvalid: false,
  };
};

const useValidate = (logicFun) => {
  const [currState, dispatch] = useReducer(reducerFn, {
    inputData: "",
    isInvalid: false,
  });
  const logicValue = logicFun(currState.inputData);

  const getInput = (event) => {
    //previous errot clear
    dispatch({ type: "CLEAR" });

    dispatch({ type: "USER_INP", entertedData: event.target.value });

    checkValid();
  };
  const checkValid = () => {
    if (!logicValue) {
      dispatch({ type: "INVALID" });
    }
  };
  return {
    value: currState.inputData,
    inValid: currState.isInvalid,
    getInput,
  };
};

export default useValidate;
