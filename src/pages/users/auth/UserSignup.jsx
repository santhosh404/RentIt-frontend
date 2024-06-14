import React, { useState } from 'react';
import SignInComponent from '../../../components/auth/SignInComponent';

//Formik imports
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../../utils/SigninValidationSchema';
import SignUpComponent from '../../../components/auth/SignUpComponent';
import { userSignUpService } from '../../../services/users/UserAuthServices';
import { useNavigate } from 'react-router-dom';


export default function UserSignup() {

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
        const response = await userSignUpService(payload);
        if (response) {
          setLoading(false)
          navigate('/user/sign-in')
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
        formTitle="User Signup"
        formik={formik}
        error={error}
        loading={loading}
      />
    </div>

  )
}
