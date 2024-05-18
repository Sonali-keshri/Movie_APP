import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./Slice/homeSlice";

export const store = configureStore({
    reducer:{
        home:homeSlice
    }
})