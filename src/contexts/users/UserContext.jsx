
import React, { createContext, useContext, useState } from 'react';
import { getOwnerRequest } from '../../services/users/UserAuthServices';
import CustomToast from '../../components/reusable/Toast';
import { toast } from 'react-toastify';
import { getUser } from '../../services/users/UserCommonServices';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const [ownerRequest, setOwnerRequest] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})

    const allOwnerRequest = async () => {
        setLoading(true);
        try {
            const response = await getOwnerRequest();
            if (response) {
                setOwnerRequest(response.data.ownerRequest);
                // toast.success(response.message);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    const getUserById = async () => {
        try {
            const response = await getUser();
            if (response) {
                setUser(response.data.user);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }


    return (
        <>
            <UserContext.Provider value={{ user, getUserById, ownerRequest, loading, setOwnerRequest, allOwnerRequest }}>
                {children} 
            </UserContext.Provider>

        </>
    )
}
