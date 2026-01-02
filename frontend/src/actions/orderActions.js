import { 
    createOrderFail, 
    createOrderRequest, 
    createOrderSuccess, 
    userOrdersFail, 
    userOrdersRequest, 
    userOrdersSuccess,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    orderUpdateRequest,
    orderUpdateSuccess,
    orderUpdateFail,
    orderDeleteRequest,
    orderDeleteSuccess,
    orderDeleteFail
} from "../slices/orderSlice";
import axios from 'axios';

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const { data } = await axios.post(`/api/v1/order/new`, order);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response?.data?.message || error.message));
    }
}

export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrdersRequest());
        const { data } = await axios.get(`/api/v1/myorders`);
        dispatch(userOrdersSuccess(data));
    } catch (error) {
        dispatch(userOrdersFail(error.response?.data?.message || error.message));
    }
}

export const getOrderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest());
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch(orderDetailSuccess(data));
    } catch (error) {
        dispatch(orderDetailFail(error.response?.data?.message || error.message));
    }
}

export const adminOrders = async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const { data } = await axios.get(`/api/v1/orders`);
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response?.data?.message || error.message));
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(orderUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/v1/order/${id}`, orderData, config);
        dispatch(orderUpdateSuccess());
    } catch (error) {
        dispatch(orderUpdateFail(error.response?.data?.message || error.message));
    }
}

export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(orderDeleteRequest());
        await axios.delete(`/api/v1/order/${id}`);
        dispatch(orderDeleteSuccess());
    } catch (error) {
        dispatch(orderDeleteFail(error.response?.data?.message || error.message));
    }
}
