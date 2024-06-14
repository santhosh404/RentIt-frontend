import * as Yup from "yup";


export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number'),
    password: Yup.string().required('Password is required').matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })

})