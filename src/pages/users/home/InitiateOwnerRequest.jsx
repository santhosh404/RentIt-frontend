import { Badge, Button, Card, FileInput, Label, Select, TextInput } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { HiPlus } from 'react-icons/hi2'
import { useFormik } from 'formik'
import { HiOutlineX, HiX } from 'react-icons/hi'
import { initiateOwnerRequestValidationSchema } from '../../../utils/ValidationSchema'
import { CommonContext } from '../../../contexts/CommonContext'
import { toast } from 'react-toastify'
import { uploadFile } from '../../../services/CommonServices'
import { makeOwnerRequest } from '../../../services/users/UserAuthServices';
import { AiOutlineLoading } from "react-icons/ai"
import { UserContext } from '../../../contexts/users/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Initiateformik() {

    const [storeDetails, setStoreDetails] = useState([1]);
    const [addressDistricts, setAddressDistricts] = useState([])
    const [storeDistricts, setStoreDistricts] = useState([])
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    //Contexts
    const { getAllStates, states, getAllDistricts } = useContext(CommonContext);
    const { user } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: user?.email,
            address_line1: '',
            address_line2: '',
            city: 'Choose city',
            state: 'Choose state',
            pincode: '',
            store_details: [{ square_feet: '', address_line1: '', address_line2: '', city: 'Choose city', state: 'Choose state', pincode: '', proof: null }]
        },
        validationSchema: initiateOwnerRequestValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await makeOwnerRequest(values);
                if (response) {
                    toast.success(response?.message)
                    setLoading(false)
                    navigate('/user/owner-request')
                    // formik.resetForm()
                }
            }
            catch (err) {
                setLoading(false)
                toast.error(err?.response?.data?.data?.error || err.message)
            }
        }
    })

    const addStore = () => {
        setStoreDetails((prev) => [...prev, prev.length + 1]);
        formik.setFieldValue('store_details', [...formik.values.store_details, { square_feet: '', address_line1: '', address_line2: '', city: 'Choose city', state: 'Choose state', pincode: '', proof: null }]);
    };

    const removeStore = (index) => {
        formik.setFieldValue(`store_details[${index}].city`, 'Choose city')
        formik.setFieldValue(`store_details[${index}].state`, 'Choose state')
        setStoreDetails((prev) => prev.filter((_, i) => i !== index));
        const newStoreDetails = formik.values.store_details.filter((_, i) => i !== index);
        formik.setFieldValue('store_details', newStoreDetails);
    };


    useEffect(() => {
        getAllStates();
    }, [])

    const handleAddressStateOnChange = async (e) => {
        formik.setFieldValue('state', e.target.value);
        formik.setFieldValue('city', 'Choose city')
        try {
            const districts = await getAllDistricts(e.target.value === 'Tamil Nadu' ? 3 : e.target.value === 'Andhra Pradesh' ? 1 : e.target.value === 'Kerala' ? 2 : 4);
            if (districts) {
                setAddressDistricts(districts.district)
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.data?.error || error.message)
        }
    }

    const handleStoreStateOnChange = async (e, index) => {
        const selectedState = e.target.value;
        formik.setFieldValue(`store_details[${index}].city`, 'Choose city')
        formik.setFieldValue(`store_details[${index}].state`, selectedState);
        try {
            const districts = await getAllDistricts(selectedState === 'Tamil Nadu' ? 3 : selectedState === 'Andhra Pradesh' ? 1 : selectedState === 'Kerala' ? 2 : 4);
            if (districts) {
                setStoreDistricts((prev) => {
                    const newStoreDistricts = [...prev];
                    newStoreDistricts[index] = districts.district;
                    return newStoreDistricts;
                });
            }
        } catch (error) {
            toast.error(error?.response?.data?.data?.error || error.message)
        }
    }

    const handleFileUpload = async (e, index) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile(formData);
            formik.setFieldValue(`store_details.${index}.proof`, response.data.fileUrl)
        }

        catch (err) {
            toast.error(err.response?.data?.data?.error || err.message)
        }
       
    }


    return (
        <div className='dark:bg-gray-800 dark:text-[#fff]'>
            <CustomNavbar />
            <div className='max-w-[1000px] mx-auto my-10'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-5 flex-wrap mt-10'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center gap-4'>
                                    <h1 className='text-[30px] font-[500]'>Initiate Your Request</h1>
                                </div>
                                <div>
                                    <p>Please fill the below details and post your request we'll look into it and get back to you shortly!</p>
                                </div>
                            </div>
                            <div>
                                <Button pill color={'success'} type='submit' disabled={loading} isProcessing={loading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>Submit Request</Button>
                            </div>

                        </div>
                        <hr />
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-[500]'>Basic Details</h1>
                            <Card className='p-5'>
                                <div className='flex justify-between gap-4 flex-wrap'>
                                    <div>
                                        <Label>First Name</Label>
                                        <TextInput
                                            // 
                                            size={'sm'}
                                            className='w-[280px]'
                                            name='first_name'
                                            value={formik.values?.first_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            shadow
                                        />
                                        {
                                            formik.touched.first_name && formik.errors.first_name && (
                                                <small className='text-[red]'>
                                                    {formik.errors.first_name}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Label>Last Name</Label>
                                        <TextInput

                                            size={'sm'}
                                            className='w-[280px]'
                                            name='last_name'
                                            value={formik.values?.last_name}
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
                                    <div>
                                        <Label>Email</Label>
                                        <TextInput

                                            size={'sm'}
                                            className='w-[280px]'
                                            name='email'
                                            value={formik.values?.email}
                                            disabled
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                        />
                                        {/* {
                                            formik.touched.email && formik.errors.email && (
                                                <small className='text-[red]'>
                                                    {formik.errors.email}
                                                </small>
                                            )
                                        } */}
                                    </div>
                                    <div>
                                        <Label>Phone Number</Label>
                                        <TextInput
                                            size={'sm'}
                                            className='w-[280px]'
                                            name='phone_number'
                                            value={formik.values?.phone_number}
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
                                            value={formik.values?.address_line1}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.address_line1 && formik.errors.address_line1 && (
                                                <small className='text-[red]'>
                                                    {formik.errors.address_line1}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Label>Address Line 2</Label>
                                        <TextInput
                                            name='address_line2'
                                            size={'sm'}
                                            className='w-[280px]'
                                            value={formik.values.address_line2}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.address_line2 && formik.errors.address_line2 && (
                                                <small className='text-[red]'>
                                                    {formik.errors.address_line2}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Label htmlFor="state" value="State" />
                                        <Select
                                            name='state'
                                            id="state"
                                            className='w-[280px]'
                                            value={formik.values.state}
                                            onChange={handleAddressStateOnChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option selected disabled>Choose state</option>
                                            {
                                                states?.map((state, idx) => <option key={idx}>{state?.name}</option>)
                                            }
                                        </Select>
                                        {
                                            formik.touched.state && formik.errors.state && (
                                                <small className='text-[red]'>
                                                    {formik.errors.state}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Label htmlFor="city" value="City" />
                                        <Select name='city' id="city" required className='w-[280px]' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                            <option disabled>Choose city</option>
                                            {
                                                addressDistricts?.map((district, idx) => <option key={idx}>{district?.districtName}</option>)
                                            }
                                        </Select>
                                        {
                                            formik.touched.city && formik.errors.city && (
                                                <small className='text-[red]'>
                                                    {formik.errors.city}
                                                </small>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <Label>Pincode</Label>
                                        <TextInput
                                            name='pincode'
                                            size={'sm'}
                                            className='w-[280px]'
                                            value={formik.values.pincode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.pincode && formik.errors.pincode && (
                                                <small className='text-[red]'>
                                                    {formik.errors.pincode}
                                                </small>
                                            )
                                        }
                                    </div>

                                    <div className='invisible'>
                                        <Label>Hidden</Label>
                                        <TextInput className='w-[280px]' />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className='flex flex-col gap-3 mt-5'>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-[500]'>Store Details</h1>
                                <Button pill color={'blue'} size={'sm'} onClick={addStore}>
                                    <HiPlus className="mr-1 h-5 w-5" /> Add Store
                                </Button>
                            </div>
                            {storeDetails.map((store, idx) => (
                                <div key={idx} className='my-5'>
                                    <div className='flex justify-between items-center mb-4'>
                                        <h1 className='font-[300]'>#{idx + 1} Store</h1>
                                        {
                                            idx > 0 && (
                                                <Button pill color={'failure'} size={'xs'} onClick={() => removeStore(idx)}>
                                                    <HiOutlineX className="mr-1 h-5 w-4" /> Remove
                                                </Button>
                                            )
                                        }

                                    </div>
                                    <Card className='p-5'>
                                        <div className='flex justify-between gap-4 flex-wrap'>
                                            <div>
                                                <Label>Square Feet</Label>
                                                <TextInput
                                                    size={'sm'}
                                                    name={`store_details.${idx}.square_feet`}
                                                    className='w-[280px]'
                                                    value={formik.values.store_details[idx].square_feet}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.store_details?.[idx]?.square_feet && formik.errors.store_details?.[idx]?.square_feet && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].square_feet}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Address Line 1</Label>
                                                <TextInput
                                                    size={'sm'}
                                                    name={`store_details.${idx}.address_line1`}
                                                    className='w-[280px]'
                                                    value={formik.values.store_details[idx].address_line1}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.store_details?.[idx]?.address_line1 && formik.errors.store_details?.[idx]?.address_line1 && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].address_line1}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Address Line 2</Label>
                                                <TextInput
                                                    size={'sm'}
                                                    name={`store_details.${idx}.address_line2`}
                                                    className='w-[280px]'
                                                    value={formik.values.store_details[idx].address_line2}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.store_details?.[idx]?.address_line2 && formik.errors.store_details?.[idx]?.address_line2 && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].address_line2}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor={`store_details.${idx}.state`} value="State" />
                                                <Select
                                                    name={`store_details.${idx}.state`}
                                                    id={`store_details.${idx}.state`}
                                                    className='w-[280px]'
                                                    value={formik.values.store_details[idx].state}
                                                    onChange={(e) => handleStoreStateOnChange(e, idx)}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option selected disabled>Choose state</option>
                                                    {
                                                        states?.map((state, idx) => <option key={idx}>{state?.name}</option>)
                                                    }
                                                </Select>
                                                {formik.touched.store_details?.[idx]?.state && formik.errors.store_details?.[idx]?.state && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].state}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor={`store_details.${idx}.city`} value="City" />
                                                <Select
                                                    name={`store_details.${idx}.city`}
                                                    id={`store_details.${idx}.city`}
                                                    className='w-[280px]'
                                                    value={formik.values.store_details[idx].city}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option selected disabled>Choose city</option>
                                                    {
                                                        storeDistricts[idx]?.map(district => <option key={district.id}>{district?.districtName}</option>)
                                                    }
                                                </Select>
                                                {formik.touched.store_details?.[idx]?.city && formik.errors.store_details?.[idx]?.city && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].city}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Pincode</Label>
                                                <TextInput
                                                    size={'sm'}
                                                    className='w-[280px]'
                                                    name={`store_details.${idx}.pincode`}
                                                    value={formik.values.store_details[idx].pincode}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.store_details?.[idx]?.pincode && formik.errors.store_details?.[idx]?.pincode && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].pincode}</small>
                                                )}
                                            </div>
                                            <div>
                                                <Label>Proof</Label>
                                                <FileInput
                                                    size={'sm'}
                                                    name={`store_details.${idx}.proof`}
                                                    className='w-[280px]'
                                                    onChange={(event) => handleFileUpload(event, idx)}
                                                />
                                                {formik.touched.store_details?.[idx]?.proof && formik.errors.store_details?.[idx]?.proof && (
                                                    <small className='text-[red]'>{formik.errors.store_details[idx].proof}</small>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

        </div>

    )
}
