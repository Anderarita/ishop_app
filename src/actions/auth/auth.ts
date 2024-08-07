import axios from "axios";
import { iShopApi } from "../../config/api/iShopApi";
import { AuthResponse } from "../../infrastructure/interfaces/auth.response";
import { User } from "../../domein/entities/user";
import { API_URL } from "@env";
import { StorageAdapter } from "../../config/adapter/storage-adapter";

const returnUserToken = (response: AuthResponse) => {
    const user: User = {
        email: response.data.email,
        fullName: response.data.fullName,
        roles: response.data.roles,
    };
    return {
        user: user,
        token: response.data.token,
        resfreshToken: response.data.refreshToken,
        tokenExpiration: response.data.refreshToken,
    };
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const {data: response} = await iShopApi.post<AuthResponse>('/auth/login',{
            email,
            password,
        });
        console.log(email,password)
        return returnUserToken(response)
    } catch (error) {
        
        if(axios.isAxiosError(error)){
            console.error('Axios error details:',{
                message: error.message,
                code: error.code,
                config: error.config,
                response: error.response?.data,
                request: error.request
            });
            
        }
    }
}

export const getRefreshToken = async () => {
    try {
        const token = await StorageAdapter.getItem('token')
        const refreshtoken = await StorageAdapter.getItem('resfreshtoken')
        if(!token && !refreshtoken){
            return null
        }

        const {data: response} = await iShopApi.post<AuthResponse>('/auth/refresh-token', {
            token,
            refreshtoken,
        });

        return returnUserToken(response);
    } catch (error) {
        console.error('Error refreshing token', error);
    }
}