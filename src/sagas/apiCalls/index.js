import moment from 'moment';
import { tokenRefresh } from './Auth';

const token = localStorage.getItem('token');
const expiresIn = localStorage.getItem('expiresIn');
const authTime = localStorage.getItem('authTime');
const refreshToken = localStorage.getItem('refreshToken');

export const APICallsWrapper = async (content) => {
    try {  
        const currentTime = moment().unix();
        const timeDiff = currentTime - authTime;
        const { api, data } = content;

        if(timeDiff >= expiresIn) {   // Token is expired
            const user = { token, refreshToken }
            const refreshData = await tokenRefresh(user);

            if(refreshData.ResponseMessage === 'Successful') {
                localStorage.setItem('token', refreshData.Data.Token);
                localStorage.setItem('expiresIn', refreshData.Data.ExpiresIn);
                localStorage.setItem('authTime', moment().unix());
                localStorage.setItem('refreshToken', refreshData.Data.RefreshToken);
                
                const apiResponse = await api(data);
                return apiResponse;
            }

            if(refreshData.ResponseMessage === 'Refresh token has expired') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('authTime');
                localStorage.removeItem('expiresIn')
                return 'Refresh token has expired';
            }
        } else {
            const apiResponse = await api(data);
            return apiResponse;
        }
    } catch (error) {
        return error;
    }
}
