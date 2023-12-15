import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/codeSilce";
import orderReducer from "./slices/orderSilce";

const store = configureStore({
  reducer: {
    code: codeReducer,
    order: orderReducer,
  },
});
export default store;
