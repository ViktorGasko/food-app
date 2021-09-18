import { createSlice } from '@reduxjs/toolkit';
import { Item } from './index';


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
      items: [] as Item[],
      totalAmount: 0,
  },
  reducers: {
    clearCart(state) {
      state.totalAmount = 0;
      state.items = [];
    },
    addItem(state, action) {
      const updatedTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item: Item) => item.id === action.payload
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item: Item) => item.id !== action.payload);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;