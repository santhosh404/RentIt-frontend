import { instance } from "../instance";


export const adminSignUpService = async (payload) => {
    try {
        const response = await instance.post('/admin/auth/signup', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}

export const adminSignInService = async (payload) => {
    try {
        const response = await instance.post('/admin/auth/signin', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}
