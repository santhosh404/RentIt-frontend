import React, { useContext, useEffect } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { UserContext } from '../../../contexts/users/UserContext';
import { Badge, Button, Card, Label, Spinner, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { HiPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom';

export default function OwnerRequest() {

    const { allOwnerRequest, ownerRequest, loading } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        allOwnerRequest()
    }, [])

    return (
        <div className='dark:bg-gray-800 dark:text-[#fff]'>
            <CustomNavbar />

            <div className='max-w-[1000px]  mx-auto my-20 '>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : (
                        !loading && !ownerRequest ? (
                            <div className='max-w-[800px] mx-auto flex flex-col gap-3 justify-center items-center flex-wrap mt-10'>
                                <h1 className='text-[20px] font-[700] flex items-center gap-2'> {<HiOutlineExclamationCircle color='red' size={'30px'} />} No owner request found!</h1>
                                <p>To initiate the owner request, simply click the button below. Once received, we'll thoroughly review your request and proceed accordingly. This will enable you to effortlessly post your store for rent!</p>
                                <Button pill className='mt-8' color='blue' onClick={() => navigate('/user/initiate-owner-request')}><HiPlus className="mr-1 h-5 w-5" /> Initiate Request</Button>
                            </div>

                        ) : !loading && (
                            <>
                                <div className='flex flex-col gap-5 flex-wrap mt-10'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex items-center gap-4'>
                                                <h1 className='font-[900] text-[23px]'>My Request</h1>
                                                <Badge color={ownerRequest.is_approved === 1 ? 'success' : ownerRequest?.is_approved === 2 ? 'failure' : 'warning'}>{ownerRequest.is_approved === 1 ? 'Approved' : ownerRequest?.is_approved === 2 ? 'Rejected' : 'Pending'}</Badge>
                                            </div>
                                            <div>
                                                <p className='font-[600]'>{ownerRequest.is_approved === 1 ? "Yeahhh!, You're request has been approved. Go ahead and post your store for rent" : ownerRequest?.is_approved === 2 ? "We're sorry!, You're request has been rejected. Please contact the administrator." : "Hang Tight! We're reviewing your request. Soon you'll response from our side"}</p>
                                            </div>
                                        </div>

                                        {
                                            ownerRequest?.is_approved === 1 && (
                                                <div>
                                                    <Button pill color={'success'} onClick={() => navigate('/user/post-property')}>Post property for rent</Button>
                                                </div>

                                            )
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
                                                    <div key={idx}>
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
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    )
                }

            </div>
        </div>
    )
}
