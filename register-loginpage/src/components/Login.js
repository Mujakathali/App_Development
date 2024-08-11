import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            setMessage('Login successful!');
            setIsSuccess(true);

            // Delay navigation to show success message
            setTimeout(() => {
                navigate('/');
            }, 2000); // Delay for 2 seconds
        } catch (error) {
            setMessage('Login failed!');
            setIsSuccess(false);

            // Optionally, you could also add a delay before redirecting to a different page or clearing the message
            setTimeout(() => {
                setMessage(''); // Clear message after 2 seconds or navigate
            }, 2000); // Delay for 2 seconds
        }
    };

    return (
        <div className="login__form">
            <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg p-4 md:p-10 shadow-md"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-brand">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">
                            Log in to continue to your account
                        </p>
                    </div>
                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        />
                    </div>
                    <div className="flex items-center w-full my-3">
                        <button
                            type="submit"
                            className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Log In
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center my-3 w-full">
                        <a
                            href="/forgot-password"
                            className="inline-block align-baseline text-md text-gray-500 hover:text-blue-800 text-right"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div className="relative">
                        <div className="absolute left-0 right-0 flex justify-center items-center">
                            <div className="border-t w-full absolute"></div>
                            <span className="bg-white px-3 text-gray-500 z-10">
                                New to EventEase?
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                        <a
                            href="/register"
                            className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                        >
                            Create an account
                        </a>
                    </div>
                    <p
                        className={isSuccess ? 'success-message' : 'error-message'}
                        style={{ marginTop: '10px', textAlign: 'right' }} // Debugging styles
                    >
                        {message}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
