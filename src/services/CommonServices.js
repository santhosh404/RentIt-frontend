import { instance } from "../services/instance";


export const getStates = async () => {
    try {
        const response = await instance.get('/common/states');
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}

export const getDistricts = async (id) => {
    try {
        const response = await instance.get(`/common/districts?state=${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}


export const uploadFile = async (formData) => {
    try {
        const response = await instance.post('/common/upload-file', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        return response.data
    }

    catch (err) {
        console.log(err);
    }
}