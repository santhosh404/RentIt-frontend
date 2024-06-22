import { Flowbite } from "flowbite-react";
import { Table } from 'flowbite-react';
import React from 'react'

export default function CustomTable({ tableHead, tableRow, tableCell, shadow }) {

    return (
        <>
            <div className={`overflow-x-auto ${shadow && `shadow-${shadow}`} rounded-md`}>
                <Table className='shadow-md'>
                    <Table.Head>
                        {
                            tableHead?.map((item, index) => {
                                return (
                                    <Table.HeadCell key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center tracking-wider">
                                        {item}
                                    </Table.HeadCell>
                                )
                            })
                        }
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            tableRow?.length === 0 ? (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell colSpan={8} className="text-center font-medium text-gray-900 dark:text-white">
                                        No Bookings found
                                    </Table.Cell>

                                </Table.Row>
                            ) :
                                tableRow?.map((item, idx) => {
                                    return (
                                        <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                                            {
                                                tableCell?.map((cell, index) => {
                                                    return (
                                                        cell.cell(item, idx)
                                                    )
                                                })

                                            }
                                        </Table.Row>
                                    )
                                })
                        }
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}
