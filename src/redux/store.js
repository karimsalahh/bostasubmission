import { configureStore } from "@reduxjs/toolkit";
import { shipmentApi } from "../services/shipmentApi";
export default configureStore({
  reducer: {
    [shipmentApi.reducerPath]: shipmentApi.reducer,
  },
});
