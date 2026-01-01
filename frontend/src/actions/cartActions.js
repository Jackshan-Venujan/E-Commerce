import { addCartItemRequest, addCartItemSuccess } from '../slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
        toast.success('Item Added to Cart!');
    } catch (error) {
        toast.error('Failed to add item to cart');
    }
}
