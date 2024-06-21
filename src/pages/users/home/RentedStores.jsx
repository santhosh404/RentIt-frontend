import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { getBookingRequestOfUser } from '../../../services/users/UserCommonServices'
import { toast } from 'react-toastify'
import { Spinner } from 'flowbite-react';
import StoreCard from '../../../components/users/StoreCard';

export default function RentedStores() {


    const [rentedStores, setRentedStores] = useState([]);
    const [storeDataLoading, setStoreDataLoading] = useState(false);

    const getAllRentedStores = async () => {
        setStoreDataLoading(true)
        try {
            const response = await getBookingRequestOfUser();
            if (response) {
                setRentedStores(response.data.bookings);
                setStoreDataLoading(false)
            }
        }
        catch (err) {
            toast.error(err.message);
            setStoreDataLoading(false)
        }
    }

    useEffect(() => {
        getAllRentedStores()
    }, [])

    return (
        <>
            <CustomNavbar />
            <div className='max-w-[1000px] mx-auto mt-20'>
                <div className='flex'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-[900] text-[23px]'>Rented Stores</h1>
                        <p>See the rented request details that you have made</p>
                    </div>
                </div>
                <div className='flex justify-center flex-wrap'>
                    {
                        storeDataLoading ? (
                            <div className='flex justify-center items-center'>
                                <Spinner />
                            </div>
                        ) : (
                            rentedStores?.length < 1 ? (
                                <div className='flex justify-center mt-10 items-center'>
                                    <h1 className='font-bold'>No stores found</h1>
                                </div>
                            ) : (
                                <div className='w-full flex justify-center gap-10 my-10 flex-wrap items-center'>
                                    {
                                        rentedStores?.map((store, idx) => (
                                            <StoreCard
                                                key={idx}
                                                storeDetails={store?.rental_store}
                                                isRentedStorePage={true}
                                                bookingRequest={store?.dates}
                                            // setOpenModal={setOpenModal}
                                            // setTableRow={setTableRow}
                                            // tableRow={tableRow}
                                            />
                                        ))
                                    }
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}
