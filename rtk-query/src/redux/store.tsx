import { configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";
import { myreducer } from "./reducer";

export const store = configureStore({
  reducer: {
    // myapi: myApi.reducer,
    // myreducer: myreducer.reducer,
    //Or
    [myApi.reducerPath]: myApi.reducer,
    [myreducer.name]: myreducer.reducer,
  },
  middleware: (mid) => mid().concat(myApi.middleware),
  //OR
  //   middleware: (mid) => [...mid(), myApi.middleware],
});
