import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // user: ...
    }
})