import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './Register.css'; // Import CSS

const Register = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', values);

            if (response.data.errors && response.data.errors.length > 0) {
                setMessage(response.data.errors.join(', '));
                setIsSuccess(false);
            } else {
                setMessage('Registration successful!');
                setIsSuccess(true);
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="register__form">
            <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="w-full max-w-lg p-4 shadow-md md:p-10">
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-extrabold text-brand">
                                        Join the Adventure!
                                    </h2>
                                    <p className="text-gray-500">
                                        Create your account and start your journey with us
                                    </p>
                                </div>
                                <div className="flex flex-wrap mb-6 -mx-3">
                                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0 relative">
                                        <Field
                                            name="firstName"
                                            placeholder="First Name"
                                            autoComplete="given-name"
                                            className={`${errors.firstName && touched.firstName ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                        />
                                    </div>
                                    <div className="w-full px-3 md:w-1/2">
                                        <Field
                                            name="lastName"
                                            placeholder="Last Name"
                                            autoComplete="family-name"
                                            className={`${errors.lastName && touched.lastName ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <Field
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="email"
                                        className={`${errors.email && touched.email ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <Field
                                        name="phoneNumber"
                                        placeholder="Phone"
                                        autoComplete="tel"
                                        className={`${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <Field
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        type="password"
                                        className={`${errors.password && touched.password ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <Field
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        autoComplete="new-password"
                                        type="password"
                                        className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                                    />
                                </div>
                                <div className="flex items-center w-full my-3">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 font-bold text-white rounded bg-brand hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    >
                                        Register
                                    </button>
                                </div>
                                <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                                    <a
                                        href="/login"
                                        className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                                    >
                                        Back to login
                                    </a>
                                </div>
                                {message && (
                                    <p className={`absolute bottom-4 right-4 px-4 py-2 rounded shadow-lg ${isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {message}
                                    </p>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
