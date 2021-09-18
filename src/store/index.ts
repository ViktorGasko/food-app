import { configureStore} from '@reduxjs/toolkit';
import cartSlice from './cart-slice';

export type Item = {
  id: string,
  name: string,
  amount: number,
  price: number,
};

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export default store;