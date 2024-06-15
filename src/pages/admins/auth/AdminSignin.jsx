import React, { useContext, useState } from 'react';
import SignInComponent from '../../../components/auth/SignInComponent';

//Formik imports
import { useFormik } from 'formik';
import { signInValidationSchema } from '../../../utils/ValidationSchema';
import { userSignInService } from '../../../services/users/UserAuthServices';
import { useNavigate } from 'react-router-dom';
import { adminSignInService } from '../../../services/admin/AdminAuthServices';


export default function AdminSignIn() {

    const [error, setError] = useState({
        state: false,
        message: ''
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signInValidationSchema,
        onSubmit: async (values) => {
            setError({
                state: false,
                message: ''
            })
            setLoading(true)
            const payload = {
                email: values.email,
                password: values.password
            }
            try {
                const response = await adminSignInService(payload);
                if (response) {
                    setLoading(false)
                    sessionStorage.setItem('token', response.data.token)
                    navigate('/admin/home')
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
            <SignInComponent
                formTitle="Admin Signin"
                formik={formik}
                error={error}
                loading={loading}
            />
        </div>

    )
}
