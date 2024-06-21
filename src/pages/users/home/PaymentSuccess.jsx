import React from 'react'
import { FaCheck } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
export default function PaymentSuccess() {
    const navigate = useNavigate()
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                   
                    <FaCheck className="h-16 w-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-semibold text-center mt-4 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 text-center mb-6">Thank you for your purchase.</p>
                    <div className="text-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => navigate('/user/home')}>Back to Home</button>
                    </div>
                </div>
            </div>
        </>
    )
}
