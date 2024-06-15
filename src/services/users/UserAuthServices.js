import { instance } from "../instance";


export const userSignUpService = async (payload) => {
    try {
        const response = await instance.post('/user/auth/signup', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}

export const userSignInService = async (payload) => {
    try {
        const response = await instance.post('/user/auth/signin', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err
    }
}

// export const userDetails = async () => {
//     try {
//         const response = await instance.get('/user/auth/details');
//         if(response) {
//             return response.data;
//         }
//     }
//     catch(err) {
//         throw err
//     }
// }

export const getOwnerRequest = async (id) => {
    try {
        const response = await instance.get(`/user/common/owner-request`, {
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

export const makeOwnerRequest = async (values) => {
    try {
        const response = await instance.post(`/user/common/owner-request`, values, {
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