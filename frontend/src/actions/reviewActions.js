import axios from 'axios';
import { 
    reviewsRequest, 
    reviewsSuccess, 
    reviewsFail,
    reviewDeleteRequest,
    reviewDeleteSuccess,
    reviewDeleteFail
} from '../slices/reviewSlice';

export const getReviews = async (dispatch) => {
    try {
        dispatch(reviewsRequest());
        const { data } = await axios.get('/api/v1/admin/reviews');
        dispatch(reviewsSuccess(data));
    } catch (error) {
        dispatch(reviewsFail(error.response?.data?.message || error.message));
    }
}

export const deleteReview = (productId, id) => async (dispatch) => {
    try {
        dispatch(reviewDeleteRequest());
        await axios.delete(`/api/v1/review?id=${id}&productId=${productId}`);
        dispatch(reviewDeleteSuccess());
    } catch (error) {
        dispatch(reviewDeleteFail(error.response?.data?.message || error.message));
    }
}
