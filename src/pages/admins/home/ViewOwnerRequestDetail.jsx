import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { HiCheck, HiOutlineExclamationCircle } from 'react-icons/hi';
import { HiPlus } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom';
import { approveOwnerRequest, ownerRequestOne, rejectOwnerRequest } from '../../../services/admin/AdminCommonServices';
import { toast } from 'react-toastify';
import AdminNavbar from '../../../components/reusable/AdminNavbar';
import { AiOutlineLoading } from 'react-icons/ai';

export default function ViewOwnerRequestDetail() {


    const [ownerRequest, setOwnerRequest] = useState({});
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState({
        approveLoading: false,
        rejectLoading: false
    });
    const navigate = useNavigate();
    const { id } = useParams()

    const ownerRequestById = async () => {
        setLoading(true);
        try {
            const response = await ownerRequestOne(id);
            setOwnerRequest(response.data.ownerRequest);
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        ownerRequestById()
    }, [])


    const handleApprove = async () => {
        setBtnLoading(prev => ({ ...prev, approveLoading: true }))
        try {
            const response = await approveOwnerRequest(id);
            toast.success(response.message)
            setBtnLoading(prev => ({ ...prev, approveLoading: false }))
            navigate('/admin/owner-request')
        }
        catch (err) {
            setBtnLoading(prev => ({ ...prev, approveLoading: false }))
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    const handleReject = async () => {
        setBtnLoading(prev => ({ ...prev, rejectLoading: true }))

        try {
            const response = await rejectOwnerRequest(id);
            toast.success(response.message)
            setBtnLoading(prev => ({ ...prev, rejectLoading: false }))
            navigate('/admin/owner-request')

        }
        catch (err) {
            setBtnLoading(prev => ({ ...prev, rejectLoading: false }))
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    return (
        <div className='dark:bg-gray-800 dark:text-[#fff]'>
            <AdminNavbar />

            <div className='max-w-[1000px]  mx-auto my-10 '>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : !loading && (
                        <>
                            <div className='flex flex-col gap-5 flex-wrap mt-10'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-4'>
                                            <h1 className='text-[30px] font-[500]'>Owner Request</h1>
                                            <Badge color={ownerRequest.is_approved === 1 ? 'success' : ownerRequest?.is_approved === 2 ? 'failure' : 'warning'}>{ownerRequest.is_approved === 1 ? 'Approved' : ownerRequest?.is_approved === 2 ? 'Rejected' : 'Pending'}</Badge>
                                        </div>
                                    </div>

                                    {

                                        <div className='flex gap-2'>
                                            <Button pill color={'failure'} disabled={ownerRequest?.is_approved === 2 || btnLoading.rejectLoading} onClick={handleReject} isProcessing={btnLoading.rejectLoading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                                               Reject
                                            </Button>
                                            <Button pill color={'success'} disabled={ownerRequest?.is_approved === 1 || btnLoading.rejectLoading} onClick={handleApprove} isProcessing={btnLoading.approveLoading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                                                Approve
                                            </Button>
                                        </div>

                                    }
                                </div>
                                <hr />
                                <div className='flex flex-col gap-3'>
                                    <h1 className='font-[500]'>Basic Details</h1>
                                    <Card className='p-5'>
                                        <div className='flex justify-between gap-4 flex-wrap'>
                                            <div>
                                                <Label>First Name</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.first_name} />
                                            </div>
                                            <div>
                                                <Label>Last Name</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.last_name} />
                                            </div>
                                            <div>
                                                <Label>Email</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.email} />
                                            </div>
                                            <div>
                                                <Label>Phone Number</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.phone_number} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className='flex flex-col gap-3 mt-5'>
                                    <h1 className='font-[500]'>Address Details</h1>
                                    <Card>
                                        <div className='flex justify-between gap-4 flex-wrap'>
                                            <div>
                                                <Label>Adress Line 1</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.address_line1} />
                                            </div>
                                            <div>
                                                <Label>Address Line 2</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.address_line2} />
                                            </div>
                                            <div>
                                                <Label>City</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.city} />
                                            </div>
                                            <div>
                                                <Label>State</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.state} />
                                            </div>
                                            <div>
                                                <Label>Pincode</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.pincode} />
                                            </div>
                                            <div className='invisible'>
                                                <Label>Pincode</Label>
                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={ownerRequest?.pincode} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className='flex flex-col gap-3 mt-5'>
                                    <h1 className='font-[500]'>Store Details</h1>
                                    {
                                        ownerRequest?.store_details && ownerRequest?.store_details.map((store, idx) => {
                                            return (
                                                <>
                                                    <h1 className='font-[300]'>#{idx + 1} Store</h1>
                                                    <Card className='p-5'>
                                                        <div className='flex justify-between gap-4 flex-wrap'>
                                                            <div>
                                                                <Label>Square Feet</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.square_feet} />
                                                            </div>
                                                            <div>
                                                                <Label>Adress Line 1</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.address_line1} />
                                                            </div>
                                                            <div>
                                                                <Label>Address Line 2</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.address_line1} />
                                                            </div>
                                                            <div>
                                                                <Label>City</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.city} />
                                                            </div>
                                                            <div>
                                                                <Label>State</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.state} />
                                                            </div>
                                                            <div>
                                                                <Label>Pincode</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.pincode} />
                                                            </div>
                                                            <div>
                                                                <Label>Proof</Label>
                                                                <TextInput color={'blue'} size={'sm'} disabled className='w-[280px]' value={store?.proof} />
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}
