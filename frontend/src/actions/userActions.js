import axios from "axios"
import { loginFail, loginRequest, loginSuccess, clearError, registerRequest, registerFail, registerSuccess, loadUserRequest, loadUserSuccess, loadUserFail, logoutSuccess, logoutFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail } from "../slices/authSlice"

export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch(loginRequest());
        const {data} = await axios.post(`api/v1/login`,{email,password});  //get
        dispatch(loginSuccess(data))

    } catch (error){
        dispatch(loginFail(error.response.data.message))

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
        const {data} = await axios.post(`api/v1/register`, userData, config);
        dispatch(registerSuccess(data))

    } catch (error){
        dispatch(registerFail(error.response.data.message))

    }
}

export const loadUser = async(dispatch) =>{
    try{
        dispatch(loadUserRequest());

        const {data} = await axios.get(`api/v1/myprofile`);
        dispatch(loadUserSuccess(data))

    } catch (error){
        dispatch(loadUserFail(error.response.data.message))

    }
}

export const logout = async(dispatch) =>{
    try{
        await axios.get(`api/v1/logout`);
        dispatch(logoutSuccess())

    } catch (error){
        dispatch(logoutFail)

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
        const {data} = await axios.put(`api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))

    } catch (error){
        dispatch(updateProfileFail(error.response.data.message))

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
        await axios.put(`api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())

    } catch (error){
        dispatch(updatePasswordFail(error.response.data.message))

    }
}