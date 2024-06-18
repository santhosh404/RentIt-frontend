import React, { useContext, useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useFormik } from 'formik'
import { UserValidationSchema } from '../../../utils/ValidationSchema'
import { updateUser, getUser } from '../../../services/users/UserCommonServices'
import { toast } from 'react-toastify'
import { AiOutlineLoading } from 'react-icons/ai'

export default function MyProfile() {
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})

    // const { getUserById } = useContext(UserContext);


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: ''
        },
        validationSchema: UserValidationSchema,
        onSubmit: async (values) => {
            setBtnLoading(true)
            try {
                const response = await updateUser(values);
                if (response) {
                    toast.success(response.message);
                    setBtnLoading(false)
                }
            }

            catch (err) {
                setBtnLoading(false)
                toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
            }
        }
    })

    const getUserById = async () => {
        try {
            const response = await getUser();
            if (response) {
                setUser(response.data.user);
                setLoading(false);
            }
        }
        catch(err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        getUserById()
    }, [])

    useEffect(() => {
        if (user) {
            formik.setFieldValue('first_name', user.first_name)
            formik.setFieldValue('last_name', user.last_name)
            formik.setFieldValue('email', user.email)
            formik.setFieldValue('phone_number', user.phone_number)
        }
    }, [user])

    return (
        <>
            <CustomNavbar />
            <div className='max-w-[800px] mx-auto mt-20'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit}>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-[900] text-[23px]'>My Profile</h1>
                                <Button pill color='blue' type='submit' isProcessing={btnLoading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                                    <HiOutlinePencilAlt className='w-4 h-4 mr-2 mt-[2px]' />
                                    Update Profile
                                </Button>
                            </div>
                            <Card className='p-3 mt-5'>
                                <div className='flex gap-3'>
                                    <div className='w-full'>
                                        <div>
                                            <Label htmlFor="first_name" value="First Name" />
                                        </div>
                                        <TextInput
                                            id="first_name"
                                            name='first_name'
                                            type="text"
                                            placeholder="John"
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.first_name && formik.errors.first_name && (
                                                <small className='text-[red]'>
                                                    {formik.errors.first_name}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <div>
                                            <Label htmlFor="last_name" value="Last Name" />
                                        </div>
                                        <TextInput
                                            id="last_name"
                                            name='last_name'
                                            type="text"
                                            placeholder="Doe"
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.last_name && formik.errors.last_name && (
                                                <small className='text-[red]'>
                                                    {formik.errors.last_name}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className='w-full'>
                                        <div>
                                            <Label htmlFor="email" value="Email" />
                                        </div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            placeholder="youremail@company.com"
                                            value={formik.values.email}
                                            disabled
                                        />

                                    </div>
                                    <div className='w-full'>
                                        <div>
                                            <Label htmlFor="phone_number" value="Phone Number" />
                                        </div>
                                        <TextInput
                                            id="phone_number"
                                            type="text"
                                            name='phone_number'
                                            placeholder="9474738281"
                                            value={formik.values.phone_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.phone_number && formik.errors.phone_number && (
                                                <small className='text-[red]'>
                                                    {formik.errors.phone_number}
                                                </small>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div>
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </Card>
                        </form>
                    )
                }

            </div>
        </>
    )
}
