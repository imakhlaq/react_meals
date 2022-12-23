import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useReducer, useState } from "react";

const reducerFn = (prev, action) => {
  if (action.type === "LOADING") {
    return {
      ...prev,
      isLoading: true,
    };
  }

  if (action.type === "LOADING_COMPLETE") {
    return {
      ...prev,
      isLoading: false,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...prev,
      isError: true,
    };
  }
  if (action.type === "CLEAR_ERR") {
    return {
      ...prev,
      isError: false,
    };
  }

  return {
    isLoading: false,
    isError: false,
  };
};

const AvailableMeals = () => {
  const [currState, dispatch] = useReducer(reducerFn, {
    isLoading: false,
    isError: false,
  });
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    const getMeals = async () => {
      try {
        //clearing previous error
        dispatch({ type: "CLEAR_ERR" });
        const res = await fetch(
          "https://meals-a7d07-default-rtdb.firebaseio.com/meals.json"
        );

        //checking for error
        if (!res.ok) {
          throw new Error("SomeThing Went wrong");
        }

        const data = await res.json();

        const value = Object.values(data);

        const loaded = value.map((meal) => {
          meal.id = Math.random();
          return meal;
        });
        //sate for loading meals
        setMeals(loaded);
      } catch (err) {
        dispatch({ type: "ERROR" });
      } finally {
        dispatch({ type: "LOADING_COMPLETE" });
      }
    };
    getMeals();
  }, []);

  //incase of loading what to return

  if (currState.isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  if (currState.isError) {
    return (
      <section>
        <p>Something Went wrong</p>
      </section>
    );
  }
  //if both the sate are false then execute this code
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
