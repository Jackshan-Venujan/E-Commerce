import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./slices/productsSlice";


const reducer = combineReducers({
    productsState: productReducer


})


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;
