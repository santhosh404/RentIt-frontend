import { Card, Checkbox, FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { TagsInput } from 'react-tag-input-component';
import { toast } from 'react-toastify';
import { uploadFile } from '../../services/CommonServices';
import { AiOutlineLoading } from 'react-icons/ai';
import { CommonContext } from '../../contexts/CommonContext';
import { converReverseDate, convertDate, isValidDate } from '../../utils/helper';

export default function PostPropertyForm({ formik, storeDetail, isUpdateOrDelete }) {

    const [isAvailableTo, setIsAvailableTo] = useState(false);
    const [selectedValue, setSelectedValue] = useState(formik.values.specification || '');
    const [keyword, setKeyword] = useState([]); // Ensure keyword is initialized as an array
    const [imageUrls, setImageUrls] = useState(formik.values.images || []);
    const [isUploading, setIsUploading] = useState(false);
    const [districts, setDistricts] = useState([]);


    const { getAllStates, states, getAllDistricts } = useContext(CommonContext);

    useEffect(() => {
        getAllStates();
    }, [])

    useEffect(() => {
        formik.setFieldValue('keywords', keyword);
    }, [keyword])

    useEffect(() => {
        formik.setFieldValue('images', imageUrls);
    }, [imageUrls])

    useEffect(() => {
        if (storeDetail) {
            setSelectedValue(storeDetail.specification);
            setKeyword(storeDetail?.keywords || []);
            setImageUrls(storeDetail.images);
            setIsAvailableTo(storeDetail?.available_to === 'Not Specified' ? true : false);
            handleStateOnChange({ target: { value: storeDetail?.state } })
        }
    }, [storeDetail]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        formik.setFieldValue('specification', event.target.value);
    };

    const handleAvailableToCheckbox = (e) => {
        setIsAvailableTo(e.target.checked);
        if (e.target.checked) {
            formik.setFieldValue('available_to', 'Not Specified');
        } else {
            formik.setFieldValue('available_to', '');
        }
    }

    const handleFileUpload = async (e) => {
        setIsUploading(true);
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile(formData);
            setImageUrls(prev => [...prev, response.data.fileUrl])
            setIsUploading(false)
        }

        catch (err) {
            setIsUploading(false)
            toast.error(err.response?.data?.data?.error || err.message)
        }
    }

    const handleStateOnChange = async (e) => {
        formik.setFieldValue('state', e.target.value);
        formik.setFieldValue('city', 'Choose city')
        try {
            const districts = await getAllDistricts(e.target.value === 'Tamil Nadu' ? 3 : e.target.value === 'Andhra Pradesh' ? 1 : e.target.value === 'Kerala' ? 2 : 4);
            if (districts) {
                setDistricts(districts.district)
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.data?.error || error.message)
        }
    }


    return (
        <>
            <div className='flex flex-col gap-4'>
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
                                    value={formik.values.square_feet}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched.square_feet && formik.errors.square_feet && (
                                        <small className='text-[red]'>
                                            {formik.errors.square_feet}
                                        </small>
                                    )
                                }
                            </div>
                            <div>
                                <Label>Available From</Label>
                                <TextInput
                                    type='date'
                                    size={'sm'}
                                    className='w-[280px]'
                                    name='available_from'
                                    value={converReverseDate(formik.values?.available_from)}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched.available_from && formik.errors.available_from && (
                                        <small className='text-[red]'>
                                            {formik.errors.available_from}
                                        </small>
                                    )
                                }
                            </div>
                            <div>
                                <Label>Avaliable To</Label>
                                <TextInput
                                    type='date'
                                    size={'sm'}
                                    className='w-[280px]'
                                    name='available_to'
                                    disabled={isAvailableTo}
                                    value={converReverseDate(formik.values.available_to)}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <div className="flex items-center gap-2 mt-2">
                                    <Checkbox id="accept" checked={isAvailableTo} onChange={handleAvailableToCheckbox} color={'blue'} />
                                    <Label htmlFor="accept" className="flex">
                                        I don't want to specify the To date
                                    </Label>
                                </div>
                                {
                                    formik.touched.available_to && formik.errors.available_to && (
                                        <small className='text-[red]'>
                                            {formik.errors.available_to}
                                        </small>
                                    )
                                }
                            </div>
                            <div className='w-full'>
                                <Label>Description</Label>
                                <Textarea
                                    rows={5}
                                    name='description'
                                    className='resize-none'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched.description && formik.errors.description && (
                                        <small className='text-[red]'>
                                            {formik.errors.description}
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
                                    onChange={handleStateOnChange}
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
                                <Select
                                    name='city'
                                    id="city"
                                    className='w-[280px]'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option disabled selected>Choose city</option>
                                    {
                                        districts?.map((district, idx) => <option key={idx}>{district?.districtName}</option>)
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
                    <h1 className='font-[500]'>Other Details</h1>
                    <Card className='p-5'>
                        <div className='w-full gap-5 flex justify-between'>
                            <div className='w-[30%]'>
                                <Label>Rent / Month</Label>
                                <TextInput
                                    type='number'
                                    name='rate'
                                    size={'sm'}
                                    value={formik.values.rate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched.rate && formik.errors.rate && (
                                        <small className='text-[red]'>
                                            {formik.errors.rate}
                                        </small>
                                    )
                                }
                            </div>
                            <div className='w-[30%]'>
                                <Label>Advance Amount</Label>
                                <TextInput
                                    type='text'
                                    name='advance_amt'
                                    size={'sm'}
                                    value={formik.values.advance_amt}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.touched.advance_amt && formik.errors.advance_amt && (
                                        <small className='text-[red]'>
                                            {formik.errors.advance_amt}
                                        </small>
                                    )
                                }
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
                                            checked={selectedValue === 'unfurnished'}
                                            onChange={handleChange}
                                            required
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
                                            checked={selectedValue === 'furnished'}
                                            onChange={handleChange}
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
                                            checked={selectedValue === 'semi-furnished'}
                                            onChange={handleChange}
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
                                {
                                    formik.touched.specification && formik.errors.specification && (
                                        <small className='text-[red]'>
                                            {formik.errors.specification}
                                        </small>
                                    )
                                }
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label>Comment</Label>
                            <Textarea
                                rows={5}
                                name='comment'
                                className='resize-none'
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.comment && formik.errors.comment && (
                                    <small className='text-[red]'>
                                        {formik.errors.comment}
                                    </small>
                                )
                            }
                        </div>
                        <div className='w-full'>
                            <Label>Keywords</Label>
                            <TagsInput
                                value={keyword}
                                onChange={setKeyword}
                                name="keyword"
                                placeHolder="Enter the keywords related to your store"
                            />
                            <small className='my-2 text-gray-500'>Note: Please press Enter after typing any word</small>
                            {
                                formik.touched.keywords && formik.errors.keywords && (
                                    <small className='text-[red]'>
                                        {formik.errors.keywords}
                                    </small>
                                )
                            }
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className='w-full'>
                            <Label htmlFor="file-upload" value="Upload Images" />
                            <div className='flex gap-3 items-start'>
                                <div className='flex flex-col w-full'>
                                    <FileInput className='w-full' onChange={handleFileUpload} id="file-upload" accept='image/png, image/jpeg, image/jpg' />
                                    <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>Allowed Formats JPEG, JPG, PNG</p>
                                </div>

                                {
                                    isUploading && (
                                        <AiOutlineLoading className="h-8 w-8 animate-spin" />
                                    )
                                }
                            </div>
                            {
                                imageUrls?.length > 0 && (
                                    <div className='flex flex-col gap-2 mt-3'>
                                        <h1 className='text-sm font-medium'>Uploaded Files</h1>
                                        <ul>

                                            {
                                                imageUrls?.map((url, index) => (
                                                    <li key={index}>
                                                        <p>{url}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
