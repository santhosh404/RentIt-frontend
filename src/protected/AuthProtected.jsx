import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthProtected({route}) {

    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            setLoggedIn(false);
            navigate(route);
        }
        else {
            setLoggedIn(true);
        }
    }, [])

    return (
        <>
            {
                isLoggedIn ? <Outlet /> : null
            }
        </>
    )
}