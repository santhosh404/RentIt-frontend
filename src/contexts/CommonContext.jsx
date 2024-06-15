import { createContext, useEffect, useState } from "react";
import { getDistricts, getStates } from "../services/CommonServices";
import { toast } from "react-toastify";


export const CommonContext = createContext({})

export const CommonContextProvider = ({ children }) => {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    const getAllStates = async () => {
        try {
            const response = await getStates();
            setStates(response.data.state);
        } catch (error) {
            toast.error(error?.response?.data?.data?.error || error.message)
        }
    }

    const getAllDistricts = async (stateId) => {
        try {
            const response = await getDistricts(stateId);
            if(response.data) {
                setDistricts(response.data);
                return response.data
            }
        } catch (error) {
            toast.error(error?.response?.data?.data?.error || error.message)
        }
    }


    return (
        <>
            <CommonContext.Provider value={{ states, districts, setStates, getAllStates, getAllDistricts }}>
                {children}
            </CommonContext.Provider>
        </>
    )
}