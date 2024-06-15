import React, { useState } from 'react';

//Formik imports
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../../utils/ValidationSchema';
import SignUpComponent from '../../../components/auth/SignUpComponent';
import { useNavigate } from 'react-router-dom';
import { adminSignUpService } from '../../../services/admin/AdminAuthServices';


export default function AdminSignUp() {

  const [error, setError] = useState({
    state: false,
    message: ''
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: ''
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      setError({
        state: false,
        message: ''
      })
      setLoading(true)
      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone_number: values.phoneNumber,
        password: values.password
      }
      try {
        const response = await adminSignUpService(payload);
        if (response) {
          setLoading(false)
          navigate('/admin/sign-in')
        }
      }
      catch (err) {
        setLoading(false)
        setError({
          state: true,
          message: err.response.data.data.error || err.response.data || err.message
        })
      }
    }
  })

  return (
    <div className='my-10'>
      <SignUpComponent
        formTitle="Admin Signup"
        formik={formik}
        error={error}
        loading={loading}
      />
    </div>

  )
}
