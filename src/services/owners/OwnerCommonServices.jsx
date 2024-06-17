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