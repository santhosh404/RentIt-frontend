import React, { useContext, useState } from 'react';
import SignInComponent from '../../../components/auth/SignInComponent';

//Formik imports
import { useFormik } from 'formik';
import { signInValidationSchema } from '../../../utils/SigninValidationSchema';
import { userSignInService } from '../../../services/users/UserAuthServices';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/users/UserContext';


export default function UserSignin() {

    const [error, setError] = useState({
        state: false,
        message: ''
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    //Context
    const { setUserDetails } = useContext(UserContext);

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
                const response = await userSignInService(payload);
                if (response) {
                    setLoading(false)
                    localStorage.setItem('token', response.data.token)
                    navigate('/user/home')
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
                formTitle="User Signin"
                formik={formik}
                error={error}
                loading={loading}
            />
        </div>

    )
}
