import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiLogin, HiLogout, HiOutlineInformationCircle, HiOutlineLogin, HiOutlineUser, HiStop, HiUserCircle } from 'react-icons/hi';
import { HiArrowTopRightOnSquare, HiBuildingLibrary, HiBuildingStorefront, HiDocumentArrowUp, HiOutlineArrowTopRightOnSquare, HiUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom'

export default function CustomNavbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState({})

    const handleSignOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])
    return (
        <>
            <Navbar fluid rounded className='border-b-2 p-4 sticky top-0 z-[1] navbar-bg' id='navbar'>
                <Navbar.Brand onClick={() => navigate('/user/home')} className='cursor-pointer'>
                    <div className='flex flex-col'>
                        <span className="whitespace-nowrap text-[30px] font-[900] dark:text-white store-name">RentIt</span>
                        <small>Rent The Store And Grow Your Business!</small>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle />
                <div className='flex gap-5 items-center'>
                    <Navbar.Collapse>
                        {
                            user.is_owner ? <Button color={'blue'} pill onClick={() => navigate('/user/post-property')}>
                                <HiOutlineInformationCircle className='w-5 h-5 mr-1' />
                                Post Store For Rent
                            </Button> : (
                                <Button color={'blue'} pill onClick={() => (sessionStorage.getItem('token') && sessionStorage.getItem('user')) ? navigate('/user/owner-request') : navigate('/user/sign-in')}>
                                    <HiOutlineInformationCircle className='w-5 h-5 mr-1' />
                                    Make Owner Request
                                </Button>
                            )
                        }

                        {/* <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link> */}

                    </Navbar.Collapse>
                    <div className="flex md:order-2">

                        {
                            sessionStorage.getItem('token') && sessionStorage.getItem('user') ? (
                                <Dropdown inline label={<Avatar rounded bordered placeholderInitials={`${user?.first_name?.charAt(0)?.toUpperCase()}${user?.last_name?.charAt(0)?.toUpperCase()}`} />} className='p-3'>
                                    <Dropdown.Item onClick={() => navigate('/user/my-profile')}>
                                        <HiUserCircle className='w-4 h-4 mr-2' />
                                        My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/user/my-stores')}>
                                        <HiBuildingStorefront className='w-4 h-4 mr-2' />
                                        My Stores
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/user/owner-request')}>
                                        <HiArrowTopRightOnSquare className='w-4 h-4 mr-2' />
                                        Owner Request
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/user/rented-stores')}>
                                        <HiBuildingLibrary className='w-4 h-4 mr-2' />
                                        Rented Stores
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/user/booking-logs')}>
                                        <HiDocumentArrowUp className='w-4 h-4 mr-2' />
                                        Booking Logs
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleSignOut}>
                                        <HiLogout className='w-4 h-4 mr-2' />
                                        Sign Out
                                    </Dropdown.Item>
                                </Dropdown>
                            ) : (
                                <>
                                    <Button pill color={'light'} outline onClick={() => navigate('/user/sign-in')}>
                                        {/* <HiOutlineLogin className='w-4 h-4 mr-2' /> */}
                                        Sign In / Sign Up
                                    </Button>
                                </>

                            )
                        }


                    </div>
                </div>
            </Navbar>
        </>
    )
}
