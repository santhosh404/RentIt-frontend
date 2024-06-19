import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom'

export default function CustomNavbar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <Navbar fluid rounded className='border-b-2 p-4 sticky top-0 z-[1]' id='navbar'>
                <Navbar.Brand onClick={() => navigate('/user/home')} className='cursor-pointer'>
                    <div className='flex flex-col'>
                        <span className="whitespace-nowrap text-[30px] font-[900] dark:text-white">RentIt</span>
                        <small>Rent The Store And Grow Your Business!</small>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle />
                <div className='flex gap-5 items-center'>
                    <Navbar.Collapse>
                        <Button color={'blue'} pill onClick={() => navigate('/user/owner-request')}>
                            <HiOutlineInformationCircle className='w-5 h-5 mr-1' />
                            Make Owner Request
                        </Button>
                        {/* <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Services</Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link> */}

                    </Navbar.Collapse>
                    <div className="flex md:order-2">

                        <Dropdown inline label={<Avatar rounded bordered placeholderInitials='RR' />} className='p-3'>
                            <Dropdown.Item onClick={() => navigate('/user/my-profile')}>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/user/my-stores')}>My Stores</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/user/owner-request')}>Owner Request</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/user/rented-stores')}>Rented Stores</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/user/booking-logs')}>Booking Logs</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
            </Navbar>
        </>
    )
}
