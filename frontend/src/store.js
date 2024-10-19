import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";

const reducer = combineSlices({
    productsState: productsReducer,
    productState: productReducer
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;




/*import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Correct way to import
import productReducer from "./slices/productsSlice";


const reducer = combineReducers({
    productsState: productReducer

})


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;*/
