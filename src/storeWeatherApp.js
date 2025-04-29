import { configureStore } from "@reduxjs/toolkit";
import weatherAppReducer from "./Slices/weatherAppSlice";

export const store = configureStore({
  reducer: {
    weatherApp: weatherAppReducer
  }
});


