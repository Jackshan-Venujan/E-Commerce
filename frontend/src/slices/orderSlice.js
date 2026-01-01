import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders: [],
        loading: false,
        error: null,
        isOrderCreated: false
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order,
                isOrderCreated: true
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderCreated(state, action) {
            return {
                ...state,
                isOrderCreated: false
            }
        },
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.Orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = orderSlice;

export const { 
    createOrderRequest, 
    createOrderSuccess, 
    createOrderFail,
    clearOrderCreated,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail
} = actions;

export default reducer;
