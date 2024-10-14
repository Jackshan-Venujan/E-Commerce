import axios from 'axios'
import { productRequest, productsFail, productSuccess } from '../slices/productsSlice';

export const getProducts = async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get('/api/v1/products');
        dispatch(productSuccess(data))

    }
    catch (error){
        dispatch(productsFail(error.response.data.message))

    }
    

}