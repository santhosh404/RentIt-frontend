

import React, { createContext, useContext, useState } from 'react';
import { UserContext, UserContextProvider } from '../users/UserContext';

export const OwnerContext = createContext({});

export const OwnerContextProvider = ({ children }) => {

    return (    
        <>
            <OwnerContext.Provider value={{}}>
                {children}
            </OwnerContext.Provider>

        </>
    )
}