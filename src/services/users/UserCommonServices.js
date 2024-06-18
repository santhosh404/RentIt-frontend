import { instance } from "../instance"

export const getUser = async () => {
    try {
        const response = await instance.get('/user/common/user', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        return response.data;
    }
    catch (err) {
        throw err
    }
}

export const updateUser = async (payload) => {
    try {
        const response = await instance.put('/user/common/user', payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        return response.data;
    }
    catch (err) {
        throw err
    }
}