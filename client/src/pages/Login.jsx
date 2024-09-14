import * as React from "react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import logo1 from "../assets/logo1.png";
import github from "../assets/github.png";
import eye001 from "../assets/eye001.png";
import eyee from "../assets/eyee.png";
import loo from "../assets/loo.jpg";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [eyeImage, setEyeImage] = useState(eyee);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setEyeImage(showPassword ? eyee : eye001);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe ? "1" : "0",
        };

        try {
            const response = await axios.post('http://localhost:5000/auth/login', formData);

            const { token, role } = response.data;
            localStorage.setItem('recoveryToken', token);
            
            toastr.success('Login successful!', 'Success', { timeOut: 5000 });
            console.log(response.data);
            setTimeout(() => {
                navigate(response.data.role === "admin" ? '/admin/dashboard' : '/client/dashboard');
            }, 5000);
        } catch (error) {
            toastr.error('Login failed: ' + error.response.data.message, 'Error');
            console.error('Error:', error.response.data.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex w-full h-screen ">
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 ">
                <img src={loo} className="hidden lg:block w-full h-full object-cover" alt="Login" />
            </div>
            <div className="w-full relative flex items-center justify-center lg:w-1/2 dark:bg-black ">
                <div className='w-11/12 max-w-[700px] px-10 py-0 rounded-3xl bg-white border-2 border-gray-100 dark:bg-black dark:text-white dark:border-gray-400'>
                    <Link to="/" className="relative top-0 mt-4 ml-4 right-10">
                        <ArrowBackIcon />
                    </Link>
                    <div className='flex items-center justify-center'>
                        <div className="w-full flex items-center justify-center">
                            <img src={logo1} alt="Logo" className="w-[124px] h-[124px] rounded-full border border-white p-2 dark:border-gray-700" />
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='font-medium text-lg text-gray-500 mt-0 dark:text-white'>It's always a pleasure to have you here.</p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='font-medium text-lg text-gray-500'>To access your account, kindly provide your login details.</p>
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            rememberMe: false,
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Email is required'),
                            password: Yup.string()
                                .required('Password is required')
                                .min(8, 'Password must be at least 8 characters')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                                ),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-medium'>Email</label>
                                    <Field
                                        className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent dark:border-gray-400'
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                </div>
                                <div className='flex flex-col mt-4'>
                                    <label className='text-lg font-medium'>Password</label>
                                    <div className='relative'>
                                        <Field
                                            className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent dark:border-gray-400'
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                        <button
                                            type="button"
                                            className='absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none '
                                            onClick={togglePasswordVisibility}
                                        >
                                            <img src={eyeImage} alt="Eye Icon" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                    <div>
                                        <Field type="checkbox" id='remember' name="rememberMe" />
                                        <label className='ml-2 font-medium text-base' htmlFor="remember">Remember Me</label>
                                    </div>
                                    <Link to="/forgot-password" className='font-medium text-base text-blue-500'>Forgot password</Link>
                                </div>
                                <div className='mt-5 flex flex-col gap-y-3 '>
                                    <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:bg-gradient-to-l text-white font-bold text-lg flex justify-center items-center'>
                                        Sign in
                                    </button>
                                    <button className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 dark:text-white '>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                                            <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                                            <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                                            <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05" />
                                        </svg>
                                        Sign in with Google
                                    </button>
                                    <button className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 dark:text-white '>
                                        <img src={github} alt="GitHub Icon" className="w-6 h-6" />
                                        Sign in with GitHub
                                    </button>
                                </div>
                                <div className='mt-4 flex justify-center items-center'>
                                    <p className='font-medium text-base'>Don't have an account?</p>
                                    <Link to="/register" className='ml-2 font-medium text-base text-blue-500'>Sign up</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
