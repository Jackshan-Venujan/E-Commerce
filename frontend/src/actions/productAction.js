import axios from 'axios'
import { productRequest, productFail, productSuccess } from '../slices/productSlice';

export const getProduct =id => async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))

    }
    catch (error){
        dispatch(productFail(error.response.data.message))
    }
}