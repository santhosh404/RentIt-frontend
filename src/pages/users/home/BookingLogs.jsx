import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import CustomTable from '../../../components/reusable/Table'
import { bookingLogs } from '../../../services/users/UserCommonServices'
import { toast } from 'react-toastify';
import { Badge, Pagination, Table, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../../utils/helper';

export default function BookingLogs() {

    const [myBookingLogs, setMyBookingLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (number) => setCurrentPage(number);


    const getBookingLogs = async () => {
        try {
            const response = await bookingLogs();
            if (response) {
                console.log(response);
                setMyBookingLogs(response.data.bookedStores);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getBookingLogs();
    }, [])


    const tableHead = [
        "Store ID",
        "From",
        "To",
        "Square Feet",
        "Description",
        "Specification",
        "Rent/Month"
    ]

    const tableCell = [
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <Link to={`/user/store/${row.rental_store_id._id}`} state={{ isRentedStorePage: true }} className='font-bold w-[200px] underline text-[blue] cursor-pointer'>{row.rental_store_id._id}</Link>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold w-[100px]'>{convertDate(row.start_date)}</p>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold w-[100px]'>{convertDate(row.end_date)}</p>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold w-[100px]'>{row.rental_store_id.square_feet}</p>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell >
                    <div className='flex justify-start items-center line-clamp-2'>
                        <Tooltip className='w-[400px]' placement='right' content={row.rental_store_id.description}>
                            <p className='font-bold w-[100px]'>{row.rental_store_id.description}</p>
                        </Tooltip>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center w-[100px]'>
                        <Badge color={`${row.rental_store_id.specification === 'unfurnished' ? 'indigo' : row.rental_store_id.specification === 'furnished' ? 'success' : 'pink'}`} className='font-bold items-center flex justify-center'>{row.rental_store_id.specification}</Badge>
                    </div>
                </Table.Cell>
            )
        },
        {
            cell: (row) => (
                <Table.Cell>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold w-[100px]'>{row.rental_store_id.rate}</p>
                    </div>
                </Table.Cell>
            )
        }
    ]


    return (
        <>
            <CustomNavbar />
            <div className='max-w-[1300px] mx-auto mt-20'>
                <h1 className='font-[900] text-[23px]'>Booking Logs ({myBookingLogs?.length})</h1>
                <div className='mt-10'>
                    <CustomTable
                        tableHead={tableHead}
                        tableRow={myBookingLogs}
                        tableCell={tableCell}
                        shadow={'sm'}
                    />
                    {/* <div className='flex justify-end'>
                        <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={100} showIcons />
                    </div> */}
                </div>
            </div>
        </>
    )
}
