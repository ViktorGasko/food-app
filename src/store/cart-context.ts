import React from 'react';

export type Item = {
  id: string,
  name: string,
  amount: number,
  price: string,
};

const CartContext = React.createContext({
  items: [] as Item[],
  totalAmount: 0,
  addItem: (item: Item) => {},
  removeItem: (id: string) => {},
  clearCart: () => {}
});

export default CartContext;