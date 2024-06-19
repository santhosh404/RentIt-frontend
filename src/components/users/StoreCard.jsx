import { Badge, Button, Card, Carousel, Modal } from 'flowbite-react'
import React from 'react'
import { convertDate } from '../../utils/helper'
import { useNavigate } from 'react-router-dom';
import { getStoreByStoreId } from '../../services/owners/OwnerCommonServices';
import { toast } from 'react-toastify';

export default function StoreCard({ storeDetails, setOpenModal, setTableRow }) {

    const navigate = useNavigate();

    const getStore = async () => {
        try {
            const response = await getStoreByStoreId(storeDetails._id);
            if (response) {
                setTableRow(response.data.store.bookings)
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <>
            <Card className="w-96">
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    className="object-cover h-48 w-full rounded-t-lg"
                >
                    {storeDetails.images.length > 0 ? storeDetails.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Property ${index + 1}`} />
                        </div>
                    )) : (
                        <div>
                            <img src="https://via.placeholder.com/400" alt="Property" />
                        </div>
                    )}
                </Carousel>
                <div className="p-4">
                    <div className="flex flex-wrap mb-4">
                        {storeDetails.keywords.map((keyword, index) => (
                            <Badge key={index} color="info" className="mr-2 mb-2">
                                {keyword}
                            </Badge>
                        ))}
                    </div>

                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                        Store Details
                    </h5>
                    <table className="mb-4 w-full text-left text-gray-900 dark:text-gray-300">
                        <tbody>
                            <tr className='w-full'>
                                <td className=" border border-gray-200 dark:border-gray-700 p-3">
                                    <div className='flex flex-col items center justify-center'>
                                        <h1 className='text-center font-semibold'>{storeDetails.square_feet} Sq.Feet</h1>
                                        <small className='text-center'>Square Feet</small>

                                    </div>
                                </td>
                                <td className=" border border-gray-200 dark:border-gray-700 p-3">
                                    <div className='flex flex-col items center justify-center'>
                                        <h1 className='text-center font-semibold'>₹ {storeDetails.rate}</h1>
                                        <small className='text-center'>Rent/Month</small>
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td className=" border border-gray-200 dark:border-gray-700 p-3">
                                    <div className='flex flex-col items center justify-center'>
                                        <h1 className='text-center font-semibold'>₹ {storeDetails.advance_amt ? storeDetails?.advance_amt : "-"}</h1>
                                        <small className='text-center'>Advance Amount</small>

                                    </div>
                                </td>
                                <td className=" border border-gray-200 dark:border-gray-700 p-3">
                                    <div className='flex flex-col items center justify-center'>
                                        <h1 className='text-center font-semibold'>{convertDate(storeDetails.available_from)}</h1>
                                        <small className='text-center'>Available From</small>

                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <div className="flex flex-col gap-4 justify-between mt-auto">
                        <Button onClick={() => navigate(`/user/my-stores/${storeDetails._id}`)} className='w-full' color={'blue'} pill>
                            View Store
                        </Button>
                        <Button
                            className='w-full'
                            color={'gray'}
                            pill
                            onClick={() => {
                                setOpenModal(true);
                                getStore();
                            }
                            }
                        >
                            View Bookings ({storeDetails.bookings.length})
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
