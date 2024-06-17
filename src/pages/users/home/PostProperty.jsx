import React, { useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { AiOutlineLoading } from 'react-icons/ai'
import { Button, Card } from 'flowbite-react'
import PostPropertyForm from '../../../components/users/PostPropertyForm'
import { HiShare } from 'react-icons/hi'
import { useFormik } from 'formik'
import { postPropertyValidationSchema } from '../../../utils/ValidationSchema'
import { postStore } from '../../../services/owners/OwnerCommonServices'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function PostProperty() {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      specification: '',
      keywords: [],
      images: []
    },
    validationSchema: postPropertyValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
          const response = await postStore(values);
          if(response) {
            setLoading(false)
            toast.success(response.message);
            formik.resetForm();
            navigate('/user/my-stores')
          }
      }
      catch(err) {
        setLoading(false)
        toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
      }
    }
  })

  return (
    <>
      <CustomNavbar />
      <div className='max-w-[1000px] mx-auto my-10'>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-5 flex-wrap'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <h1 className='text-[30px] font-[500]'>Post Your Store For Rent</h1>
                <p>Fill up the details to post your store for rent</p>
              </div>

              {
                <Button type='submit' pill color={'success'} isProcessing={loading} processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}>
                  <HiShare className='mr-1 h-5 w-5' />
                  Post Store
                </Button>
              }
            </div>
            <hr />
            <div className='mt-5'>
              <PostPropertyForm
                formik={formik}
              />
            </div>
          </div>
        </form>

      </div>
    </>
  )
}
