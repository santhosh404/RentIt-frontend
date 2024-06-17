import React, { useContext, useEffect } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { UserContext } from '../../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { HiExclamation, HiExclamationCircle, HiMail, HiOutlineExclamationCircle, HiOutlineMail, HiPlus } from 'react-icons/hi';
import { HiXCircle } from 'react-icons/hi2';

export default function MyStores() {
    const { allOwnerRequest, ownerRequest, loading } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        allOwnerRequest()
    }, [])

    return (
        <>
            <CustomNavbar />
            <div className='max-w-[1000px] mx-auto mt-20'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : (
                        !loading && !ownerRequest ? (
                            <div className='max-w-[800px] mx-auto flex flex-col gap-3 justify-center items-center flex-wrap mt-10'>
                                <h1 className='text-[20px] font-[700] flex items-center gap-2'> {<HiOutlineExclamationCircle color='red' size={'30px'} />} No owner request found!</h1>
                                <p className='text-justify'>To initiate the owner request, simply click the button below. Once received, we'll thoroughly review your request and proceed accordingly. This will enable you to effortlessly post your store for rent!</p>
                                <Button pill className='mt-8' color='blue' onClick={() => navigate('/user/initiate-owner-request')}><HiPlus className="mr-1 h-5 w-5" /> Initiate Request</Button>
                            </div>

                        ) : !loading && (
                            <>
                                {
                                    ownerRequest.is_approved === 3 ? (
                                        <div className='max-w-[800px] mx-auto flex flex-col gap-3 justify-center items-center flex-wrap mt-10'>
                                            <h1 className='text-[20px] font-[700] flex items-center gap-2'> {<HiExclamationCircle color='#FD9B63' size={'30px'} />} OOPS! You're owner request is still pending</h1>
                                            <p className='text-justify'>We are pleased to inform you that your owner request is currently pending. Our team is reviewing the details and will provide you with an update as soon as possible. In the meantime, if you have any questions or need further assistance, please feel free to contact our support team or your system administrator. Thank you for your patience and understanding.</p>
                                            {/* <Button pill className='mt-8' color='blue' onClick={() => window.location.href = "mailto:admin@rentit.com"}><HiOutlineMail className="mr-1 h-5 w-5" /> Contact Administrator</Button> */}
                                            <Button pill className='mt-8' color='blue' onClick={() => window.location.href = "mailto:admin@rentit.com"}><HiOutlineMail className="mr-1 h-5 w-5" /> Contact Administrator</Button>

                                        </div>
                                    ) :
                                        ownerRequest.is_approved === 2 ? (
                                            <div className='max-w-[800px] mx-auto flex flex-col gap-3 justify-center items-center flex-wrap mt-10'>
                                                <h1 className='text-[20px] font-[700] flex items-center gap-2'> {<HiXCircle color='red' size={'30px'} />} OOPS! You're owner request was rejected</h1>
                                                <p className='text-justify'>We regret to inform you that your owner request has been declined. To resolve this issue, we recommend reaching out to our support team or your system administrator. They will be able to provide you with the necessary assistance and guidance to move forward. Thank you for your understanding and cooperation.</p>
                                                <Button pill className='mt-8' color='blue' onClick={() => window.location.href = "mailto:admin@rentit.com"}><HiOutlineMail className="mr-1 h-5 w-5" /> Contact Administrator</Button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex flex-col gap-2'>
                                                        <h1 className='font-[500] text-[20px]'>My Stores</h1>
                                                        <p>You're now approved owner. Now you can start posting your property or Store for rent</p>
                                                    </div>
                                                    <div>
                                                        <Button pill color='blue' onClick={() => navigate('/user/post-property')}><HiPlus className="mr-1 h-5 w-5" />Post property</Button>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                }

                                {/* <div className='flex flex-col gap-5 flex-wrap mt-10'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex items-center gap-4'>
                                                <h1 className='text-[30px] font-[500]'>My Request</h1>
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
                                </div> */}
                            </>
                        )
                    )
                }

            </div>
        </>
    )
}
