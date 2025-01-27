import axios from "axios"
import { loginFail, loginRequest, loginSuccess } from "../slices/authSlice"

export const login = (email,password) => async(dispath) =>{
    try{
        dispath(loginRequest)
        const {data} = await axios.post(`api/v1/login `,{email,password});
        dispath(loginSuccess(data))

    } catch (error){
        dispath(loginFail(error.response.data.message))

    }
}