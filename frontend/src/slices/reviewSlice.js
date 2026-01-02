import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
        isReviewDeleted: false
    },
    reducers: {
        reviewsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        reviewDeleteRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        reviewDeleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        reviewDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
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

const { actions, reducer } = reviewSlice;

export const {
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    reviewDeleteRequest,
    reviewDeleteSuccess,
    reviewDeleteFail,
    clearReviewDeleted,
    clearError
} = actions;

export default reducer;
