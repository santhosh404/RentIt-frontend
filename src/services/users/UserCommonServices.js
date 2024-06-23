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

export const allStores = async (filters = {}) => {
    let userId = null;
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
        userId = JSON.parse(sessionStorage.getItem('user'))._id;
    }
    try {
        let url = `/user/common/all-rental-stores`;

        const queryParams = [];
        if (userId) queryParams.push(`userId=${userId}`);
        if (filters.keywords?.length > 0) queryParams.push(`keywords=${filters.keywords.join(',')}`);
        if (filters.state && filters.state !== "Choose state") queryParams.push(`state=${filters.state}`);
        if (filters.district && filters.district !== "Choose district") queryParams.push(`district=${filters.district}`);
        if (filters.specification) queryParams.push(`specification=${filters.specification}`);
        if (filters.rentPerMonth?.length > 0) queryParams.push(`rentPerMonth=${filters.rentPerMonth.join(',')}`);
        if (filters.squareFeet?.length > 0) queryParams.push(`squareFeet=${filters.squareFeet.join(',')}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        const response = await instance.get(url);
        return response.data;
    } catch (err) {
        throw err;
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

export const updatePaymentOnSuccess = async (payload) => {
    try {
        const response = await instance.put('/user/common/update-payment', payload, {
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

export const bookingLogs = async () => {
    try {
        const response = await instance.get('/user/common/booking-logs', {
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