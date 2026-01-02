import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders: [],
        adminOrders: [],
        loading: false,
        error: null,
        isOrderCreated: false,
        isOrderDeleted: false,
        isOrderUpdated: false
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
        },
        adminOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDeleteRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDeleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        orderDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderUpdateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        orderUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
            }
        },
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
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
    orderDetailFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    orderDeleteRequest,
    orderDeleteSuccess,
    orderDeleteFail,
    orderUpdateRequest,
    orderUpdateSuccess,
    orderUpdateFail,
    clearOrderUpdated,
    clearOrderDeleted,
    clearError
} = actions;

export default reducer;
