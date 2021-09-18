import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { Item } from "../../store/index";
import CheckOut from "./Checkout";
import { cartActions } from "../../store/cart-slice";

interface CartProps {
  onClose: Function;
}

const Cart = (props: CartProps) => {
  const [checkOut, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHandler = (item: Item) => {
    dispatch(cartActions.addItem(item));
  };

  const orderHandler = () => {
    setCheckout(true);
  };
  const submitOrderHandler = (userData: {
    name: string;
    adress: string;
    city: string;
    phone: string;
  }) => {
    setIsSubmitting(true);
    fetch(
      "https://vue-http-demo-46312-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    ).then(() => {
      setIsSubmitting(false);
      setDidSubmit(true);
      dispatch(cartActions.clearCart());
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item: Item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={() => props.onClose()}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOut && (
        <CheckOut
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        ></CheckOut>
      )}
      {!checkOut && modalAction}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending your order...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={() => props.onClose()}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
