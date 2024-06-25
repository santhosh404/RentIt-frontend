import { Alert, Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
// import wave from '../../assets/wave.png';
import { Link } from 'react-router-dom';
import { HiInformationCircle, HiMail, HiPhone } from 'react-icons/hi';


export default function SignUpComponent({ loading, formTitle, formik, error }) {
    return (
        <>
            <div className='max-w-lg mx-auto mt-10 mb-5'>
                <div className='flex gap-2 items-center'>
                    {/* <img src={wave} className="mr-1 h-10 sm:h-14" alt="Flowbite React Logo" /> */}
                    <div className='flex flex-col'>
                        <span className="whitespace-nowrap text-[30px] font-[900] dark:text-white store-name">RentIt</span>
                        <small>Rent The Store And Grow Your Business!</small>
                    </div>
                </div>
            </div>
            <Card className='max-w-lg mx-auto'>
                <h1 className='flex justify-center text-[20px] font-[600]'>{formTitle}</h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <div>
                            <Label htmlFor="firstName" value="Your First Name" />
                        </div>
                        <TextInput id="firstName" type="text" name='firstName' placeholder="John" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.onBlur} />
                        {
                            formik.touched.firstName && formik.errors.firstName && (
                                <small className='text-[red]'>
                                    {formik.errors.firstName}
                                </small>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="lastName" value="Your Last Name" />
                        </div>
                        <TextInput id="lastName" type="text" name='lastName' placeholder="Doe" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.onBlur} />
                        {
                            formik.touched.lastName && formik.errors.lastName && (
                                <small className='text-[red]'>
                                    {formik.errors.lastName}
                                </small>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="phoneNumber" value="Your Phone Number" />
                        </div>
                        <TextInput id="phoneNumber" type="text" name='phoneNumber' icon={HiPhone} placeholder="Doe" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.onBlur} />
                        {
                            formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <small className='text-[red]'>
                                    {formik.errors.phoneNumber}
                                </small>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" name='email' icon={HiMail} placeholder="name@example.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.onBlur} />
                        {
                            formik.touched.email && formik.errors.email && (
                                <small className='text-[red]'>
                                    {formik.errors.email}
                                </small>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" name='password' type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {
                            formik.touched.password && formik.errors.password && (
                                <small className='text-[red]'>
                                    {formik.errors.password}
                                </small>
                            )
                        }
                    </div>
                    <div className='flex justify-end gap-2 items-center'>
                        <p>Already Have an Account?</p>
                        <p><Link to={'/user/sign-in'} className='text-[blue]'>Signin</Link></p>
                    </div>
                    <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
                        {
                            loading ?
                                <>
                                    <Spinner size={'sm'} /> &nbsp;
                                    Loading...
                                </>
                                :
                                'Sign Up'
                        }
                    </Button>
                </form>
                {
                    error.state &&
                    <Alert color="failure" icon={HiInformationCircle} >
                        <span className="font-medium">OOPS!</span> {error.message}
                    </Alert>
                }

            </Card>
        </>
    )
}
