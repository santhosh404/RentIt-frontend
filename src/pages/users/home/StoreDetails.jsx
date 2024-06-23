import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { Badge, Button, Card, Label, Modal, Table, TextInput, Textarea } from 'flowbite-react'
import { getStoreByStoreId } from '../../../services/owners/OwnerCommonServices';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { converReverseDate, convertDate } from '../../../utils/helper';
import { HiOutlineDotsVertical, HiOutlineTicket } from 'react-icons/hi';
import CustomTable from '../../../components/reusable/Table';
import { useFormik } from 'formik';
import { bookStoreValidationSchema } from '../../../utils/ValidationSchema';
import { bookingRequest } from '../../../services/users/UserCommonServices';
import { AiOutlineLoading } from 'react-icons/ai';

const tableHead = [
    "S.no",
    "From",
    "To",
    "Status",
    "Message"
]
export default function StoreDetails() {

    const [storeDetail, setStoreDetail] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [bookNowModal, setBookNowModal] = useState(false);
    const [tableRow, setTableRow] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()

    const { state } = useLocation();


    const getStoreById = async (id) => {
        try {
            const response = await getStoreByStoreId(id);
            if (response) {
                setStoreDetail(response.data.store);
                setTableRow(response.data.store.bookings);
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        getStoreById(id)
    }, [])

    const tableCell = [
        {
            cell: (row, idx) => (
                <Table.Cell># {idx + 1}</Table.Cell>
            ),

        },
        {
            cell: (row) => (
                <Table.Cell>{convertDate(row?.start_date)}</Table.Cell>
            ),

        },
        {
            cell: (row) => (
                <Table.Cell>{convertDate(row?.end_date)}</Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell className='flex justify-center'>
                    <Badge className='flex justify-center' color={row.is_available === 1 ? 'success' : row.is_available === 2 ? 'failure' : row.is_available === 3 ? 'success' : 'warning'}>
                        {row?.is_available === 1 ? 'Approved' : row.is_available === 2 ? 'Rejected' : row.is_available === 3 ? 'Booked' : "Pending"}
                    </Badge>
                </Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold w-[200px]'>{row?.is_available === 1 ? 'Store with dates are aceepted and awaiting payment' : row.is_available === 2 ? 'Booking was rejected by owner' : row?.is_available === 3 ? 'Store was booked with successfull payment' : "Awaiting action from owner"}</p>
                    </div>
                </Table.Cell>
            ),
        },

    ]

    const formik = useFormik({
        initialValues: {
            start_date: '',
            end_date: '',
        },
        validationSchema: bookStoreValidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await bookingRequest({ ...values, rent_store_id: id });
                if (response) {
                    toast.success(response.message);
                    formik.resetForm();
                    setBookNowModal(false);
                    getStoreById(id);
                    navigate('/user/rented-stores')
                    setLoading(false)
                }
            }
            catch (err) {
                setLoading(false)
                toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
            }
        }
    })


    return (
        <>
            <CustomNavbar />
            <div className='max-w-[1000px] mx-auto'>
                <div className='flex justify-between items-center my-10'>
                    <h1 className='font-[900] text-[23px]'>Store Details</h1>
                    {
                        !state?.isRentedStorePage && (
                            <div className='flex justify-center gap-2'>
                                <Button pill color={'gray'} onClick={() => {
                                    setOpenModal(true);
                                    getStoreById(id);
                                }}>View Availability</Button>
                                <Button pill color={'blue'}  onClick={() => {
                                    setBookNowModal(true);
                                }}>Book Now</Button>

                            </div>
                        )
                    }

                </div>
                <div className='flex flex-col gap-4 mb-20'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-[500]'>Basic Details</h1>
                        <Card className='p-5'>
                            <div className='flex justify-between gap-4 flex-wrap'>
                                <div>
                                    <Label>Square Feet</Label>
                                    <TextInput
                                        // 
                                        size={'sm'}
                                        className='w-[280px]'
                                        name='square_feet'
                                        value={storeDetail?.square_feet}
                                        disabled
                                    />

                                </div>
                                <div>
                                    <Label>Available From</Label>
                                    <TextInput
                                        type='text'
                                        size={'sm'}
                                        className='w-[280px]'
                                        name='available_from'
                                        disabled
                                        value={converReverseDate(storeDetail?.available_from)}
                                    />
                                </div>
                                <div>
                                    <Label>Avaliable To</Label>
                                    <TextInput
                                        type='text'
                                        size={'sm'}
                                        className='w-[280px]'
                                        name='available_to'
                                        disabled
                                        value={storeDetail?.available_to === 'Not Specified' ? 'Not Specified' : converReverseDate(storeDetail?.available_to)}
                                    />
                                </div>
                                <div className='w-full'>
                                    <Label>Description</Label>
                                    <Textarea
                                        rows={5}
                                        name='description'
                                        className='resize-none'
                                        value={storeDetail?.description}
                                        disabled
                                    />

                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <h1 className='font-[500]'>Address Details</h1>
                        <Card className='p-5'>
                            <div className='flex justify-between gap-4 flex-wrap'>
                                <div>
                                    <Label>Adress Line 1</Label>
                                    <TextInput
                                        name='address_line1'
                                        size={'sm'}
                                        className='w-[280px]'
                                        value={storeDetail?.address_line1}
                                        disabled
                                    // value={formik.values?.address_line1}

                                    />

                                </div>
                                <div>
                                    <Label>Address Line 2</Label>
                                    <TextInput
                                        name='address_line2'
                                        size={'sm'}
                                        className='w-[280px]'
                                        value={storeDetail?.address_line2}
                                        disabled
                                    />

                                </div>
                                <div>
                                    <Label htmlFor="state" value="State" />
                                    <TextInput
                                        name='state'
                                        id="state"
                                        className='w-[280px]'
                                        value={storeDetail?.state}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="city" value="City" />
                                    <TextInput
                                        name='city'
                                        id="city"
                                        className='w-[280px]'
                                        value={storeDetail?.city}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Label>Pincode</Label>
                                    <TextInput
                                        name='pincode'
                                        size={'sm'}
                                        className='w-[280px]'
                                        value={storeDetail?.pincode}
                                        disabled
                                    />

                                </div>

                                <div className='invisible'>
                                    <Label>Hidden</Label>
                                    <TextInput className='w-[280px]' />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <h1 className='font-[500]'>Other Details</h1>
                        <Card className='p-5'>
                            <div className='w-full gap-5 flex justify-between'>
                                <div className='w-[30%]'>
                                    <Label>Rate Per Month</Label>
                                    <TextInput
                                        type='number'
                                        name='rate'
                                        size={'sm'}
                                        value={storeDetail?.rate}
                                        disabled
                                    />

                                </div>
                                <div className='w-[30%]'>
                                    <Label>Advance Amount</Label>
                                    <TextInput
                                        type='text'
                                        name='advance_amt'
                                        size={'sm'}
                                        value={storeDetail?.advance_amt}
                                        disabled
                                    />

                                </div>

                                <div className='flex flex-col w-[40%]'>
                                    <label htmlFor='checkbox' className='font-medium text-sm'>Specification:</label>
                                    <ul className="flex w-full gap-2 mt-1" id='checkbox'>
                                        <li>
                                            <input
                                                type="radio"
                                                id="unfurnished-option"
                                                value="unfurnished"
                                                className="hidden peer"
                                                checked={storeDetail?.specification === 'unfurnished'}
                                            />
                                            <label
                                                htmlFor="unfurnished-option"
                                                className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-sm">Un Furnished</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="radio"
                                                id="furnished-option"
                                                value="furnished"
                                                className="hidden peer"
                                                checked={storeDetail?.specification === 'furnished'}
                                            />
                                            <label
                                                htmlFor="furnished-option"
                                                className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-sm">Furnished</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="radio"
                                                id="semi-furnished-option"
                                                value="semi-furnished"
                                                className="hidden peer"
                                                checked={storeDetail?.specification === 'semi-furnished'}
                                            />
                                            <label
                                                htmlFor="semi-furnished-option"
                                                className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-sm">Semi Furnished</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className='w-full'>
                                <Label>Comment From Owner</Label>
                                <Textarea
                                    rows={5}
                                    name='comment'
                                    className='resize-none'
                                    value={storeDetail?.comment}
                                    disabled
                                />

                            </div>
                        </Card>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <h1 className='font-[500]'>Owner Details</h1>

                        <Card className='p-5 relative shadow-xl'>
                            <div className='absolute flex items-center justify-center text-center p-5'>
                                <p className='font-bold z-10 text-[#000]'>
                                    To view owner details, you need to raise the booking request and your request should be approved by the owner.
                                </p>
                            </div>
                            <div className='w-full flex justify-between blur'>
                                <div>
                                    <Label>Owner Name</Label>
                                    <TextInput
                                        size={'sm'}
                                        className='w-[280px] pointer-events-none'
                                        name='owner_name'
                                        value={storeDetail?.user_id?.first_name}
                                        disabled
                                        onCopy={() => false}
                                    />
                                </div>
                                <div>
                                    <Label>Owner Email</Label>
                                    <TextInput
                                        size={'sm'}
                                        className='w-[280px]'
                                        name='owner_email'
                                        value={storeDetail?.user_id?.email}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <Label>Owner Phone Number</Label>
                                    <TextInput
                                        size={'sm'}
                                        className='w-[280px]'
                                        name='owner_phone'
                                        value={storeDetail?.user_id?.phone_number}
                                        disabled
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)} size={'6xl'}>
                    <Modal.Header>Booking details</Modal.Header>
                    <Modal.Body>
                        <CustomTable
                            tableHead={tableHead}
                            tableRow={tableRow}
                            tableCell={tableCell}
                            shadow={'sm'}
                        />
                    </Modal.Body>
                    {/* <Modal.Footer className='flex justify-end'>
                        <Button color="gray" pill onClick={() => setOpenModal(false)}>
                            <HiOutlineX className='w-5 h-5 mr-1' />
                            Close
                        </Button>
                       
                    </Modal.Footer> */}
                </Modal>
                <Modal show={bookNowModal} onClose={() => setBookNowModal(false)} size={'lg'}>
                    <Modal.Header>Fill Out Booking Details</Modal.Header>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Body>
                            <div className='flex gap-5 justify-center items-center'>
                                <div>
                                    <Label>Start Date</Label>
                                    <TextInput
                                        type='date'
                                        name='start_date'
                                        value={formik.values.start_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.start_date && formik.errors.start_date && (
                                            <small className='text-[red]'>
                                                {formik.errors.start_date}
                                            </small>
                                        )
                                    }
                                </div>
                                <div>
                                    <Label>End Date</Label>
                                    <TextInput
                                        type='date'
                                        name='end_date'
                                        value={formik.values.end_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.end_date && formik.errors.end_date && (
                                            <small className='text-[red]'>
                                                {formik.errors.end_date}
                                            </small>
                                        )
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='flex justify-end'>
                            <Button type='submit' color="blue" pill isProcessing={loading} processingSpinner={<AiOutlineLoading className='h-4 w-4 mr-2 animate-spin' />}>
                                
                                Book Now
                            </Button>
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>
        </>
    )
}
