import React, { useContext, useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { UserContext } from '../../../contexts/users/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Modal, Spinner, Badge, Dropdown, Popover, TextInput, Label } from 'flowbite-react';
import { HiDotsVertical, HiExclamation, HiExclamationCircle, HiMail, HiOutlineDotsVertical, HiOutlineExclamationCircle, HiOutlineMail, HiOutlinePlus, HiOutlinePlusCircle, HiOutlineSave, HiOutlineUserAdd, HiOutlineX, HiOutlineXCircle, HiPlus } from 'react-icons/hi';
import { HiXCircle } from 'react-icons/hi2';
import { bookRequestAction, getStoreById } from '../../../services/owners/OwnerCommonServices';
import { toast } from 'react-toastify';
import StoreCard from '../../../components/users/StoreCard';
import CustomTable from '../../../components/reusable/Table';
import { capitalizeAndConcat, convertDate } from '../../../utils/helper';
import { AiOutlineLoading } from 'react-icons/ai';
import { useFormik } from 'formik';


const tableHead = [
    "S.no",
    "From",
    "To",
    "Requester Name",
    "Requester Email",
    "Requester Phone",
    "Status",
    "Action"
]

// const tableRow = [
//     {
//         "sno": 1,
//         "from": "2021-08-01",
//         "to": "2021-08-31",
//         "status": "accepted",
//         "action": "View"
//     },
//     {
//         "sno": 2,
//         "from": "2021-08-01",
//         "to": "2021-08-31",
//         "status": "pending",
//         "action": "View"
//     },
//     {
//         "sno": 3,
//         "from": "2021-08-01",
//         "to": "2021-08-31",
//         "status": "rejected",
//         "action": "View"
//     }
// ]


export default function MyStores() {
    const { allOwnerRequest, ownerRequest, loading } = useContext(UserContext);
    const [myStore, setMyStore] = useState([]);
    const [storeDataLoading, setStoreDataLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [tableRow, setTableRow] = useState([]);
    const [btnLoading, setBtnLoading] = useState({
        approveLoading: false,
        rejectLoading: false
    });
    const [row, setRow] = useState({});
    const [showMinimumAdvanceModal, setShowMinimumAdvanceModal] = useState(false);
    const [minimumAdvanceValue, setMinimumAdvanceValue] = useState('')
    const [minimumAdvanceError, setMinimumAdvanceError] = useState({
        state: false,
        message: ''
    });


    const handleAction = async (action, booking, minimumAdvanceAmount) => {
        if (!minimumAdvanceAmount) {
            setMinimumAdvanceError((prevState) => ({
                state: true,
                message: "Minimum advance amount is required"
            }));
            return;
        }
        if (action === 1) {
            setBtnLoading((prevState) => ({
                ...prevState,
                approveLoading: true
            }));
        } else {
            setBtnLoading((prevState) => ({
                ...prevState,
                rejectLoading: true
            }));
        }
        try {
            const response = await bookRequestAction({ booking_id: booking._id, action: action, minimum_advance_amount: minimumAdvanceAmount });
            toast.success(response.message);
            setShowMinimumAdvanceModal(false);
            setMinimumAdvanceError({
                state: false,
                message: ''
            })
            getMyStores();
            if (action === 1) {
                setBtnLoading((prevState) => ({
                    ...prevState,
                    approveLoading: false
                }));
            } else {
                setBtnLoading((prevState) => ({
                    ...prevState,
                    rejectLoading: false
                }));
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
            if (action === 1) {
                setBtnLoading((prevState) => ({
                    ...prevState,
                    approveLoading: false
                }));
            } else {
                setBtnLoading((prevState) => ({
                    ...prevState,
                    rejectLoading: false
                }));
            }
            setMinimumAdvanceError({
                state: false,
                message: ''
            })
        }
    };

    const navigate = useNavigate();

    const getMyStores = async () => {
        setStoreDataLoading(true)
        try {
            const response = await getStoreById()
            if (response) {
                setMyStore(response.data.store);
                setStoreDataLoading(false)
            }
        }

        catch (err) {
            setStoreDataLoading(false)
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        allOwnerRequest();
        getMyStores();
    }, [])


    const tableCell = [
        {
            cell: (row, idx) => (
                <Table.Cell># {idx + 1}</Table.Cell>
            ),

        },
        {
            cell: (row) => (
                <Table.Cell>{convertDate(row.start_date)}</Table.Cell>
            ),

        },
        {
            cell: (row) => (
                <Table.Cell>{convertDate(row.end_date)}</Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>{capitalizeAndConcat(row.user_id.first_name, row.user_id.last_name)}</Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>{row.user_id.email}</Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>{row.user_id.phone_number}</Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <Badge color={row.is_available === 1 ? 'success' : row.is_available === 2 ? 'failure' : row.is_available === 3 ? 'success' : 'warning'}>
                        {row.is_available === 1 ? 'Approved' : row.is_available === 2 ? 'Rejected' : row.is_available === 3 ? 'Booked' : "Pending"}
                    </Badge>
                </Table.Cell>
            ),
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        {
                            row.is_available === 3 ? (
                                "None"
                            ) : (
                                <Dropdown
                                    className='z-10'
                                    inline
                                    arrowIcon={false}
                                    placement='right'
                                    label={<HiOutlineDotsVertical className='w-5 h-5 cursor-pointer text-[#000]' />}
                                    dismissOnClick={false}
                                >
                                    <Dropdown.Item className='font-[500]' onClick={() => {
                                        setRow(row);
                                        setShowMinimumAdvanceModal(true);
                                        setOpenModal(false);
                                    }}>
                                        <HiOutlinePlus className='w-4 h-4 mr-1' />
                                        Accept
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleAction(2, row)} className='font-[500]'>

                                        {
                                            btnLoading.rejectLoading ? <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" /> : <HiOutlineX className='w-4 h-4 mr-1' />
                                        }
                                        Reject
                                    </Dropdown.Item>
                                </Dropdown>
                            )
                        }
                    </div>
                </Table.Cell>
            ),
        },

    ]


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
                                                        <h1 className='font-[900] text-[23px]'>My Stores ({myStore?.length})</h1>
                                                        <p>You're now approved owner. Now you can start posting your property or Store for rent</p>
                                                    </div>
                                                    <div>
                                                        <Button pill color='blue' onClick={() => navigate('/user/post-property')}><HiPlus className="mr-1 h-5 w-5" />Post property</Button>
                                                    </div>
                                                </div>
                                                <div className='flex justify-center flex-wrap'>
                                                    {
                                                        storeDataLoading ? (
                                                            <div className='flex justify-center items-center'>
                                                                <Spinner />
                                                            </div>
                                                        ) : (
                                                            myStore?.length < 1 ? (
                                                                <div className='flex justify-center mt-20 items-center'>
                                                                    <h1 className='font-bold'>No stores found</h1>
                                                                </div>
                                                            ) : (
                                                                <div className='w-full flex justify-center gap-3 my-10 flex-wrap items-center'>
                                                                    {
                                                                        myStore?.map((store, idx) => (
                                                                            <StoreCard
                                                                                key={idx}
                                                                                storeDetails={store}
                                                                                setOpenModal={setOpenModal}
                                                                                setTableRow={setTableRow}
                                                                                tableRow={tableRow}
                                                                            />
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </>
                                        )
                                }
                            </>
                        )
                    )
                }

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
                <Modal.Footer className='flex justify-end'>
                    <Button color="blue" pill onClick={() => setOpenModal(false)}>
                        <HiOutlineX className='w-5 h-5 mr-1' />
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showMinimumAdvanceModal} onClose={() => {
                setShowMinimumAdvanceModal(false);
                setMinimumAdvanceError({
                    state: false,
                    message: ''
                })
            }} size={'2xl'}>
                <Modal.Header>Minimum Advance to be paid by user</Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <Label>Minimum Advance</Label>
                        <TextInput
                            placeholder='Enter a minimum advance to be paid by user'
                            value={minimumAdvanceValue}
                            onChange={(e) => setMinimumAdvanceValue(e.target.value)}
                        />
                        {
                            minimumAdvanceError.state && <small className='text-[red]'>{minimumAdvanceError.message}</small>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="blue" pill onClick={() => {
                        handleAction(1, row, minimumAdvanceValue);

                    }}>
                        {
                            btnLoading.approveLoading ? <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" /> : <HiOutlinePlus className='w-4 h-4 mr-1' />
                        }
                        Accept Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
