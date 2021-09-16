import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

interface CheckOutProps {
  onCancel: Function;
  onConfirm: Function;
}

const isEmpty = (value: string) => value.trim() === "";

const CheckOut = (props: CheckOutProps) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    adress: true,
    city: true,
    phone: true,
  });
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const adressRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cityRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const phoneRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const nameIsValid = !isEmpty(nameRef.current.value);
    const adressIsValid = !isEmpty(adressRef.current.value);
    const cityIsValid = !isEmpty(cityRef.current.value);
    const phoneIsValid = !isEmpty(phoneRef.current.value);

    const formIsValid =
      nameIsValid && adressIsValid && cityIsValid && phoneIsValid;

    setFormInputValidity({
      name: nameIsValid,
      adress: adressIsValid,
      city: cityIsValid,
      phone: phoneIsValid,
    });
    if (formIsValid) {
      props.onConfirm({
        name: nameRef.current.value,
        adress: adressRef.current.value,
        city: cityRef.current.value,
        phone: phoneRef.current.value,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputValidity.name && <p>Please enter your name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.adress ? "" : classes.invalid
        }`}
      >
        <label htmlFor="adress">Adress</label>
        <input type="text" id="adress" ref={adressRef} />
        {!formInputValidity.adress && <p>Please enter your adress!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputValidity.city && <p>Please enter your city!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.phone ? "" : classes.invalid
        }`}
      >
        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" ref={phoneRef} />
        {!formInputValidity.phone && <p>Please enter your phone number!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={() => props.onCancel()}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
