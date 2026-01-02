import axios from 'axios'
import { productsRequest, productsFail, productsSuccess } from '../slices/productsSlice';
import { productRequest, productFail, productSuccess } from '../slices/productSlice';

export const getProducts = (keyword, page) => async (dispatch) =>{
    try{
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${page}`;
        if(keyword) {
            link += `&keyword=${keyword}`;
        }
        const {data} = await axios.get(link);
        dispatch(productsSuccess(data))

    }
    catch (error){
        dispatch(productsFail(error.response?.data?.message || error.message))

    }
}



export const getProduct =id => async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))

    }
    catch (error){
        dispatch(productFail(error.response?.data?.message || error.message))
    }
}