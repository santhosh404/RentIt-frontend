import { Badge, Button, Card, Carousel, Modal, Table } from 'flowbite-react'
import React from 'react'
import { convertDate, getDateAndTimeFromIsoString } from '../../utils/helper'
import { useNavigate } from 'react-router-dom';
import { getStoreByStoreId } from '../../services/owners/OwnerCommonServices';
import { toast } from 'react-toastify';
import { HiOutlineEye } from 'react-icons/hi';
import { makePayment, paymentVerification, updatePaymentOnSuccess } from '../../services/users/UserCommonServices';

export default function StoreCard({ storeDetails, bookingRequest, setOpenModal, setTableRow, isListPage, isRentedStorePage }) {

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

    const handlePayNow = async (amount, booking_id) => {

        try {

            const apiResponse = await makePayment({ amount, booking_id });

            const options = {
                key: "rzp_test_tnCdFa30rqjFdx",
                amount: apiResponse?.data?.newPayment?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "RentIt",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: apiResponse.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1


                handler: function (response) {
                    console.log(apiResponse, response);
                    updatePaymentOnSuccess({ payment_id: apiResponse?.data?.newPayment?._id, transaction_id: response.razorpay_payment_id, status: 1 })
                        .then((r) => {
                            toast.success(r.message);
                        }).catch((error) => {
                            toast.error(error.response.data.data.error || error.response.data.message || error.message);
                        });
                    navigate(`/user/payment/success/${response?.data?.newPayment?.razorpay_order_id}`);
                },
                callback_url: `http://localhost:4000/api/user/common/payment-verification`,
                // prefill: {
                //     name: "Santhosh A",
                //     email: "santhoshmathi2002@gmail.com",
                //     contact: "9000090000",
                // },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);

            rzp1.open();

        }

        catch (err) {
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }

    }

    return (
        <>
            <Card className='w-full'>
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
                            <img src="https://via.placeholder.com/1200" alt="Property" />
                        </div>
                    )}
                </Carousel>
                <div className="px-4">
                    <div className="flex flex-wrap">
                        {storeDetails.keywords.map((keyword, index) => (
                            <Badge key={index} color="info" className="mr-2 mb-2">
                                {keyword}
                            </Badge>
                        ))}
                    </div>
                    <div>
                        <p className='my-4 text-justify'>{storeDetails.description}</p>
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
                    {
                        isRentedStorePage && (
                            <>
                                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                    Booking Details
                                </h5>
                                <Table className="mb-4 w-full text-left text-gray-900 dark:text-gray-300">
                                    <Table.Head className='text-center'>
                                        <Table.HeadCell>Start Date</Table.HeadCell>
                                        <Table.HeadCell>End Date</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                        <Table.HeadCell>Payment</Table.HeadCell>

                                    </Table.Head>
                                    <Table.Body>
                                        {
                                            bookingRequest?.map((booking, index) => (
                                                <Table.Row key={index} className='text-center'>
                                                    <Table.Cell>
                                                        {convertDate(booking.dates)}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {convertDate(booking.end_date)}
                                                    </Table.Cell>
                                                    <Table.Cell className='flex justify-center' align='center'>
                                                        <Badge className='flex justify-center' color={booking.status === 1 ? 'success' : booking.status === 2 ? 'failure' : booking.status === 3 ? "success" : 'warning'}>
                                                            {booking?.status === 1 ? 'Approved' : booking.status === 2 ? 'Rejected' : booking.status === 3 ? 'Booked' : "Pending"}
                                                        </Badge>
                                                    </Table.Cell>
                                                    <Table.Cell align='center'>
                                                        {
                                                            booking.status === 4 ? (
                                                                <Button onClick={() => navigate('/user/booking-logs')} color={'blue'} pill size={'xs'}>
                                                                    View logs
                                                                </Button>
                                                            ) : (
                                                                <Button onClick={() => handlePayNow(1, booking.booking_id)} color={'blue'} pill size={'xs'} disabled={booking.status === 1 ? false : booking.status === 2 ? true : true}>
                                                                    Pay Now
                                                                </Button>
                                                            )
                                                        }

                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </>
                        )

                    }

                    <div className="flex flex-col gap-4 justify-between mt-auto">
                        <Button onClick={() => navigate(`/user/${isListPage || isRentedStorePage ? 'store' : 'my-stores'}/${storeDetails._id}`, { state: { isRentedStorePage: isRentedStorePage } })} className='w-full' color={'blue'} pill>
                            View Store
                        </Button>
                        {
                            !isListPage && !isRentedStorePage && (
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
                            )
                        }

                    </div>
                </div>
                <div className='flex justify-end pr-4'>
                    <small>Posted At <span className='font-bold'>{getDateAndTimeFromIsoString(storeDetails.createdAt)}</span></small>
                </div>
            </Card>
        </>
    )
}
