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

export const allStores = async () => {
    try {
        const response = await instance.get('/user/common/all-rental-stores', {
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
 
export const bookingRequest = async (payload) => {
    try {
        const response = await instance.post('/user/common/rent-request', payload, {
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

export const getBookingRequestOfUser = async () => {
    try {
        const response = await instance.get('/user/common/rent-request', {
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

export const makePayment = async (payload) => {
    try {
        const response = await instance.post('/user/common/payment', payload, {
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

export const paymentVerification = async (payload) => {
    try {
        const response = await instance.post('/user/common/payment-verification', payload, {
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