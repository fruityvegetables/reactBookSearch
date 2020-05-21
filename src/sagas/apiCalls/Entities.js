import { http } from '../../util/http';

export const getPaginatedDataApiCall = async ({ baseEntityAPI, page, rowsPerPage }) => {
    try {
        const response = await http().get(`/${baseEntityAPI}?page=${page+1}&pageSize=${rowsPerPage}`);
        return response;
    } catch(error){
        return error.response.data;
    }    
}

export const getExtraDataApiCall = async (url) => {
    try {
        const response = await http().get(`/${url}`);
        return response;
    } catch(error){
        return error.response.data;
    }
}

export const createDataApiCall = async ({ data, baseEntityAPI }) => {
    try {
        const response = await http().post(`/${baseEntityAPI}`, data)
        return response;
    } catch(error) {
        return error.response;
    }
}

export const getOneApiCall = async ({ id, baseEntityAPI }) => {
    try {
        const response = await http().get(`/${baseEntityAPI}/${id}`)
        return response;
    } catch(error) {
        return error.response.data;
    }
}

export const updateApiCall = async ({data, id, baseEntityAPI}) => {
    try {
        const response = await http().put(`/${baseEntityAPI}/${id}`, data)
        return response
    } catch(error) {
        return error.response;
    }
}

export const deleteApiCall = async ({ toDelete, baseEntityAPI }) => {
    try {
        toDelete.forEach(async id => {
            const response = await http().delete(`/${baseEntityAPI}/${id}`);
        });
        return 'success';
    } catch(error) {
        return error.response.data;
    }
}
