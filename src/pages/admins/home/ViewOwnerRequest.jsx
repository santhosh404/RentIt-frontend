import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/reusable/AdminNavbar'
import { Badge, Button, Card, Select, Spinner } from 'flowbite-react';
import { allOwnerRequest, ownerRequestFilter } from '../../../services/admin/AdminCommonServices';
import { toast } from 'react-toastify';
import { HiOutlineEye } from 'react-icons/hi';
import { getDateAndTimeFromIsoString } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';

export default function ViewOwnerRequest() {

    const [allOwnerRequestState, setAllOwnerRequestState] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const getAllOwnerRequest = async () => {
        setLoading(true);
        try {
            const response = await allOwnerRequest();
            if (response) {
                setAllOwnerRequestState(response?.data?.ownerRequest);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err.message)
        }
    }

    useEffect(() => {
        getAllOwnerRequest()
    }, [])

    const getStatusBadge = (status) => {
        switch (status) {
            case 1:
                return <Badge color="success">Approved</Badge>;
            case 3:
                return <Badge color="warning">Pending</Badge>;
            case 2:
                return <Badge color="failure">Rejected</Badge>;
            default:
                return <Badge color="info">No Action Taken</Badge>;
        }
    };

    const handleFilterChange = async (e) => {
        const state = e.target.value;
        let is_approved;

        if(state === 'Approved') {
            is_approved = 1;
        } else if(state === 'Rejected') {
            is_approved = 2;
        } else if(state === 'Pending') {
            is_approved = 3;
        } else if(state === 'All') {
            is_approved = 0;
        }

        setLoading(true);
        try {
            const response = await ownerRequestFilter(is_approved);
            if (response) {
                setAllOwnerRequestState(response?.data?.ownerRequest);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err.message)
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className='mt-10 max-w-[1400px] mx-auto'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-5 justify-end'>
                                <h1>Filter by</h1>
                                <Select onChange={handleFilterChange}>
                                    <option>All</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                    <option>Pending</option>
                                </Select>
                            </div>
                            <div className='flex items-center justify-center gap-4 mt-10'>

                                {allOwnerRequestState?.map((ownerRequest) => (
                                    <Card key={ownerRequest._id} className='w-[400px]'>
                                        <div className="flex items-center mb-4">
                                            <img
                                                className="w-12 h-12 rounded-full mr-4"
                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                alt="Avatar"
                                            />
                                            <div className='flex gap-2 items-start'>
                                                <div className='flex flex-col'>
                                                    <h5 className="text-xl font-[700]">{ownerRequest.first_name} {ownerRequest.last_name}</h5>
                                                    <small>{getDateAndTimeFromIsoString(ownerRequest?.createdAt)}</small>
                                                </div>
                                                {getStatusBadge(ownerRequest.is_approved)}
                                            </div>
                                        </div>
                                        <h1 className='font-[600]'>Owner's Basic Details: </h1>
                                        <div className="mb-1">
                                            {/* <span className="text-gray-600">Email:</span> */}
                                            <span> {ownerRequest.email}</span>
                                        </div>
                                        <div className="mb-1">
                                            {/* <span className="text-gray-600">Phone:</span> */}
                                            <span> {ownerRequest.phone_number}</span>
                                        </div>
                                        <div className="mb-1">
                                            {/* <span className="text-gray-600">Address:</span> */}
                                            <span> {ownerRequest.address_line1}, {ownerRequest.address_line2}, {ownerRequest.city}, {ownerRequest.state}, {ownerRequest.pincode}</span>
                                        </div>

                                        <Button color="blue" pill className="mt-4" onClick={() => navigate(`/admin/owner-request/${ownerRequest._id}`)}>
                                            {<HiOutlineEye size={'18px'} className='mt-[2px] mr-2' />}
                                            View Request
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </div>

                    )
                }
            </div>
        </>
    )
}
