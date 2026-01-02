import axios from 'axios';
import { 
    adminProductsRequest, 
    adminProductsSuccess, 
    adminProductsFail,
    productCreateRequest,
    productCreateSuccess,
    productCreateFail,
    productUpdateRequest,
    productUpdateSuccess,
    productUpdateFail,
    productDeleteRequest,
    productDeleteSuccess,
    productDeleteFail
} from '../slices/productSlice';

export const getAdminProducts = async (dispatch) => {
    try {
        dispatch(adminProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(adminProductsSuccess(data.products));
    } catch (error) {
        dispatch(adminProductsFail(error.response?.data?.message || error.message));
    }
}

export const createProduct = productData => async (dispatch) => {
    try {
        dispatch(productCreateRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post('/api/v1/admin/product/new', productData, config);
        dispatch(productCreateSuccess(data));
    } catch (error) {
        dispatch(productCreateFail(error.response?.data?.message || error.message));
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch(productUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.put(`/api/v1/product/${id}`, productData, config);
        dispatch(productUpdateSuccess(data));
    } catch (error) {
        dispatch(productUpdateFail(error.response?.data?.message || error.message));
    }
}

export const deleteProduct = id => async (dispatch) => {
    try {
        dispatch(productDeleteRequest());
        await axios.delete(`/api/v1/product/${id}`);
        dispatch(productDeleteSuccess());
    } catch (error) {
        dispatch(productDeleteFail(error.response?.data?.message || error.message));
    }
}
