import { useDispatch } from "react-redux";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { cartActions } from "../../../store/cart-slice";

const MealItem = (props: any) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
