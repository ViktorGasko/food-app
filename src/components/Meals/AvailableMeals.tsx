import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: string;
};

const AvailableMeals = () => {
  const [meals, setMeals] = useState([] as Meal[]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const loadedMeals = [] as Meal[];
    fetch(
      "https://vue-http-demo-46312-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        response.json().then((response: any) => {
          for (const key in response) {
            loadedMeals.push({
              id: key,
              name: response[key].name,
              description: response[key].description,
              price: response[key].price,
            });
          }
          setMeals(loadedMeals);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.mealsIsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }
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
