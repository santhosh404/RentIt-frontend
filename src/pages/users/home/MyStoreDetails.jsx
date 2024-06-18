import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { Button } from 'flowbite-react'
import { HiOutlinePencilAlt, HiOutlineTrash, HiShare, HiTrash } from 'react-icons/hi'
import PostPropertyForm from '../../../components/users/PostPropertyForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { deleteStore, getStoreByStoreId, updateStore } from '../../../services/owners/OwnerCommonServices'
import { toast } from 'react-toastify'
import { postPropertyValidationSchema } from '../../../utils/ValidationSchema'
import { AiOutlineLoading } from 'react-icons/ai'

export default function MyStoreDetails() {
    const [updateBtnLoading, setUpdateBtnLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const navigate = useNavigate()
    const [storeDetail, setStoreDetail] = useState({})
    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            square_feet: '',
            available_from: '',
            available_to: '',
            description: '',
            address_line1: '',
            address_line2: '',
            city: 'Choose city',
            state: 'Choose state',
            pincode: '',
            rate: '',
            advance_amt: '',
            specification: '',
            comment: '',
            keywords: [],
            images: []
        },
        validationSchema: postPropertyValidationSchema,
        onSubmit: async (values) => {
            setUpdateBtnLoading(true);
            try {
                const response = await updateStore(values, id);
                if (response) {
                    toast.success(response.message);
                    formik.resetForm();
                    navigate('/user/my-stores');
                    setUpdateBtnLoading(false);
                }
            }
            catch (err) {
                setUpdateBtnLoading(false);
                toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
            }
        }
    })

    const getStoreById = async () => {
        try {
            const response = await getStoreByStoreId(id);
            if (response) {
                setStoreDetail(response.data.store);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        getStoreById()
    }, [])

    useEffect(() => {
        if (storeDetail) {
            formik.setValues({
                square_feet: storeDetail.square_feet || '',
                available_from: storeDetail.available_from || '',
                available_to: storeDetail.available_to || '',
                description: storeDetail.description || '',
                address_line1: storeDetail.address_line1 || '',
                address_line2: storeDetail.address_line2 || '',
                city: storeDetail.city || 'Choose city',
                state: storeDetail.state || 'Choose state',
                pincode: storeDetail.pincode || '',
                rate: storeDetail.rate || '',
                advance_amt: storeDetail.advance_amt || '',
                specification: storeDetail.specification || '',
                comment: storeDetail.comment || '',
                keywords: storeDetail.keywords || [],
                images: storeDetail.images || []
            });
        }
    }, [storeDetail]);

    const handleDeleteStore = async () => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteStore(id);
            if (response) {
                toast.success(response.message);
                navigate('/user/my-stores')
                setDeleteBtnLoading(false);
            }
        }
        catch (err) {
            setDeleteBtnLoading(false);
            toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
        }
    }

    return (
        <>
            <CustomNavbar />
            <div className='max-w-[1000px] mx-auto my-10'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-5 flex-wrap'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-[900] text-[23px]'>Update or Delete Your Store </h1>
                                <p>Update or Delete your store to make it happen</p>
                            </div>

                            {
                                <div className='flex gap-2 '>
                                    <Button type='submit' pill color={'blue'} isProcessing={updateBtnLoading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                                        <HiOutlinePencilAlt className='mr-1 h-5 w-5' />
                                        Update
                                    </Button>
                                    <Button onClick={handleDeleteStore} pill color={'failure'} isProcessing={deleteBtnLoading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                                        <HiOutlineTrash className='mr-1 h-5 w-5' />
                                        Delete
                                    </Button>
                                </div>

                            }
                        </div>
                        <hr />
                        <div className='mt-5'>
                            <PostPropertyForm
                                formik={formik}
                                storeDetail={storeDetail}
                                isUpdateOrDelete={true}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
