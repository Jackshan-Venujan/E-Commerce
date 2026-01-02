import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: {},
        loading: false,
        error: null,
        isUserDeleted: false,
        isUserUpdated: false,
        isUserCreated: false
    },
    reducers: {
        usersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userDeleteRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userDeleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        userDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userUpdateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        userUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated: false
            }
        },
        clearUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted: false
            }
        },
        userCreateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userCreateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserCreated: true
            }
        },
        userCreateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserCreated(state, action) {
            return {
                ...state,
                isUserCreated: false
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

const { actions, reducer } = userSlice;

export const {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    userUpdateRequest,
    userUpdateSuccess,
    userUpdateFail,
    userDeleteRequest,
    userDeleteSuccess,
    userDeleteFail,
    userCreateRequest,
    userCreateSuccess,
    userCreateFail,
    clearUserUpdated,
    clearUserDeleted,
    clearUserCreated,
    clearError
} = actions;

export default reducer;
