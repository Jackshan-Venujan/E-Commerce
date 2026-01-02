import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        isProductDeleted: false,
        isProductUpdated: false,
        isProductCreated: false
    },
    reducers: { 
        productRequest(state, action){
            return {
                ...state,
                loading: true,          //loading spinner
            }
        },
        productSuccess(state,action){
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        adminProductsSuccess(state,action){
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        },
        adminProductsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        productDeleteRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        productDeleteSuccess(state,action){
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        productDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },
        productCreateRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        productCreateSuccess(state,action){
            return {
                ...state,
                loading: false,
                isProductCreated: true,
                product: action.payload.product
            }
        },
        productCreateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
        productUpdateRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        productUpdateSuccess(state,action){
            return {
                ...state,
                loading: false,
                isProductUpdated: true,
                product: action.payload.product
            }
        },
        productUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated: false
            }
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const {actions, reducer} = productSlice;

export const {
    productRequest,
    productSuccess,
    productFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    productDeleteRequest,
    productDeleteSuccess,
    productDeleteFail,
    clearProductDeleted,
    productCreateRequest,
    productCreateSuccess,
    productCreateFail,
    clearProductCreated,
    productUpdateRequest,
    productUpdateSuccess,
    productUpdateFail,
    clearProductUpdated,
    clearError
} = actions;

export default reducer;

