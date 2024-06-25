import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowCircleDown, HiLogout, HiUser, HiUserCircle } from 'react-icons/hi';
import { HiMiniArrowDownRight, HiMiniUsers, HiOutlinePower } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom'

export default function AdminNavbar() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({})

    const handleSignOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setAdmin(JSON.parse(user));
        }
    }, [])
    return (
        <>
            <Navbar gradientDuoTone="purpleToBlue" fluid rounded className='border-b-2 p-4 sticky top-0 z-[999] navbar-bg' id='navbar'>
                <Navbar.Brand onClick={() => navigate('/admin/owner-request')} className='cursor-pointer'>
                    <div className='flex flex-col'>
                        <span className="whitespace-nowrap text-[30px] font-[900] dark:text-white store-name">RentIt</span>
                        <small>Rent The Store And Grow Your Business!</small>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle />
                <div className='flex gap-5 items-center'>
                    <Navbar.Collapse>
                        <Button color={'blue'} pill onClick={() => navigate('/admin/owner-request')}>View Owner Requests</Button>
                        {/* <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link> */}

                    </Navbar.Collapse>
                    <div className="flex md:order-2">

                        <Dropdown inline label={<Avatar rounded bordered placeholderInitials={`${admin?.first_name?.charAt(0)?.toUpperCase()}${admin?.last_name?.charAt(0)?.toUpperCase()}`} />} className='p-3'>
                            <Dropdown.Item onClick={() => navigate('/admin/my-profile')}>
                                <HiUserCircle className='w-4 h-4 mr-2' />
                                My Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/admin/owner-request')}>
                                <HiArrowCircleDown className='w-4 h-4 mr-2' />
                                Owner Requests
                            </Dropdown.Item>
                            {/* <Dropdown.Item>
                                <HiMiniUsers className='w-4 h-4 mr-2' />
                                Users
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <HiUser className='w-4 h-4 mr-2' />
                                Owners
                            </Dropdown.Item> */}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>
                                <HiLogout className='w-4 h-4 mr-2' />
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </Navbar>
        </>
    )
}
