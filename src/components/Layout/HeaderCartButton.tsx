import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { Item } from "../../store";

const HeaderCartButton = (props: { onClick: Function }) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useSelector((state: any) => state.cart);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber: number, item: Item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={() => props.onClick()}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
