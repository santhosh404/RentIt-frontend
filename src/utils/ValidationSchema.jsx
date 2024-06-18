import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/


export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
})

export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number'),
    password: Yup.string().required('Password is required').matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })

})

export const initiateOwnerRequestValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    phone_number: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    address_line2: Yup.string().required('Address Line 2 is required'),
    state: Yup.string().notOneOf(['Choose state'], 'State is required'),
    city: Yup.string().required('City is required').notOneOf(['Choose city'], 'City is required'),
    pincode: Yup.string().required('Pincode is required'),
    store_details: Yup.array().of(
        Yup.object().shape({
            square_feet: Yup.string().required('Square Feet is required'),
            address_line1: Yup.string().required('Address Line 1 is required'),
            address_line2: Yup.string().required('Address Line 2 is required'),
            city: Yup.string().required('City is required').notOneOf(['Choose city'], 'City is required'),
            state: Yup.string().required('State is required').notOneOf(['Choose state'], 'State is required'),
            pincode: Yup.string().required('Pincode is required'),
            proof: Yup.mixed().required('Proof is required')
        })
    )
})


export const postPropertyValidationSchema = Yup.object().shape({
    square_feet: Yup.string().required('Square feet required'),
    available_from: Yup.string().required('Available From is required'),
    available_to: Yup.string().required('Available To is required'),
    description: Yup.string().required('Description is required'),
    address_line1: Yup.string().required('Address Line 1 is required'),
    address_line2: Yup.string().required('Address Line 2 is required'),
    city: Yup.string().required('City is required').notOneOf(['Choose city'], 'City is required'),
    state: Yup.string().notOneOf(['Choose state'], 'State is required'),
    pincode: Yup.string().required('Pincode is required'),
    rate: Yup.string().required('Rate is required'),
    advance_amt: Yup.string().required('Advance amount is required'),
    specification: Yup.string().required('Specification is required'),
    comment: Yup.string().required('Comment is required'),
    keywords: Yup.array()
        .min(2, 'At least 2 keywords are required')
        .max(5, 'No more than 5 keywords are allowed')
        .required('Keywords are required')
})


export const UserValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    phone_number: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number'),
    // password: Yup.string().matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })
})