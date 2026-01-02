import axios from "axios"
import { 
    loginFail, 
    loginRequest, 
    loginSuccess, 
    clearError, 
    registerRequest, 
    registerFail, 
    registerSuccess, 
    loadUserRequest, 
    loadUserSuccess, 
    loadUserFail, 
    logoutSuccess, 
    logoutFail, 
    updateProfileRequest, 
    updateProfileSuccess, 
    updateProfileFail, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updatePasswordFail 
} from "../slices/authSlice"
import { 
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
    userCreateFail
} from "../slices/userSlice"

export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch(loginRequest());
        const {data} = await axios.post(`/api/v1/login`,{email,password});
        dispatch(loginSuccess(data))

    } catch (error){
        dispatch(loginFail(error.response?.data?.message || error.message))

    }
}

export const clearAuthError = dispatch =>{
    dispatch(clearError());
}

export const register = (userData) => async(dispatch) =>{
    try{
        dispatch(registerRequest());
        const config = {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        };
        const {data} = await axios.post(`/api/v1/register`, userData, config);
        dispatch(registerSuccess(data))

    } catch (error){
        dispatch(registerFail(error.response?.data?.message || error.message))

    }
}

export const loadUser = async(dispatch) =>{
    try{
        dispatch(loadUserRequest());

        const {data} = await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))

    } catch (error){
        dispatch(loadUserFail(error.response?.data?.message || error.message))

    }
}

export const logout = async(dispatch) =>{
    try{
        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())

    } catch (error){
        dispatch(logoutFail(error.response?.data?.message || error.message))

    }
}

export const updateProfile = (userData) => async(dispatch) =>{
    try{
        dispatch(updateProfileRequest());
        const config = {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        };
        const {data} = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))

    } catch (error){
        dispatch(updateProfileFail(error.response?.data?.message || error.message))

    }
}

export const updatePassword = (formData) => async(dispatch) =>{
    try{
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        };
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())

    } catch (error){
        dispatch(updatePasswordFail(error.response?.data?.message || error.message))

    }
}

// Admin Actions
export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest());
        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data));
    } catch (error) {
        dispatch(usersFail(error.response?.data?.message || error.message));
    }
}

export const getUser = id => async (dispatch) => {
    try {
        dispatch(userRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(userFail(error.response?.data?.message || error.message));
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(userUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`/api/v1/admin/user/${id}`, userData, config);
        dispatch(userUpdateSuccess());
    } catch (error) {
        dispatch(userUpdateFail(error.response?.data?.message || error.message));
    }
}

export const deleteUser = id => async (dispatch) => {
    try {
        dispatch(userDeleteRequest());
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(userDeleteSuccess());
    } catch (error) {
        dispatch(userDeleteFail(error.response?.data?.message || error.message));
    }
}

export const createUser = (userData) => async (dispatch) => {
    try {
        dispatch(userCreateRequest());
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        await axios.post(`/api/v1/admin/user/new`, userData, config);
        dispatch(userCreateSuccess());
    } catch (error) {
        dispatch(userCreateFail(error.response?.data?.message || error.message));
    }
}