import { instance } from "../instance";


export const postStore = async (payload) => {
    try {
        const response = await instance.post('/owner/common/post-store', payload, {
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

export const getStoreById = async () => {
    try {
        const response = await instance.get('/owner/common/my-store', {
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

export const getStoreByStoreId = async (id) => {
    try {
        const response = await instance.get(`/owner/common/my-store/${id}`, {
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


export const updateStore = async (payload, id) => {
    try {
        const response = await instance.put(`/owner/common/my-store/${id}`, payload, {
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

export const deleteStore = async (id) => {
    try {
        const response = await instance.delete(`/owner/common/my-store/${id}`, {
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