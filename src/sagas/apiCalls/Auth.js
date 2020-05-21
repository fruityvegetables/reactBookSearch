import { httpUMS } from '../../util/http';

export const signInUserApiCall = async (user) => {
    try {
        const response = await httpUMS().post('/SignIn', user);
        return response.data;
    } catch(error){
        return error.response;
    }
}

export const tokenRefresh = async (user) => {
    try {
        const response = await httpUMS().post('/RefreshToken', user);
        return response.data;
    } catch(error){
        return error.response;
    }
}
