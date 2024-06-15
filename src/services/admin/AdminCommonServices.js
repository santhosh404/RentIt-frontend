import { instance } from "../instance"

export const allOwnerRequest = async (req, res) => {
    try {
        const response = await instance.get('/admin/common/all-owner-request', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err;
    }
}

export const ownerRequestOne = async (id) => {
    try {
        const response = await instance.get(`/admin/common/owner-request/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err;
    }
}

export const approveOwnerRequest = async (id) => {
    try {
        const response = await instance.post(`/admin/common/approve-owner-request`, {id}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(response) {
            return response.data;
        }
    }

    catch(err) {
        throw err;
    }
}

export const rejectOwnerRequest = async (id) => {
    try {
        const response = await instance.post(`/admin/common/reject-owner-request`, {id}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(response) {
            return response.data;
        }
    }

    catch(err) {
        throw err;
    }
}

export const ownerRequestFilter = async (id) => {
    try {
        const response = await instance.get(`/admin/common/owner-request?status=${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if(response) {
            return response.data;
        }
    }

    catch(err) {
        throw err;
    }
}