import React, { useState, useContext, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye001 from "../assets/eye001.png";
import eyee from "../assets/eyee.png";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const RecoveryContext = createContext();

export default function Reset() {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeImage, setEyeImage] = useState(eyee);
  const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeImage(showPassword ? eyee : eye001);
  };

  const [page, setPage] = useState("reset");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  function changePassword() {
    setPage("recovered");
  }

  const handlePasswordReset = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("recoveryToken");
    
        toastr.success('Password updated successfully!', { autoClose: 4000 });
        setTimeout(() => {
          navigate('/client/dashboard');
      }, 2000);
  };

  return (
    <RecoveryContext.Provider value={{ page, setPage, otp, setOTP, setEmail, email }}>
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-black">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-700 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}

            validationSchema={Yup.object({
              password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
            })}
            onSubmit={handlePasswordReset}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div className='flex flex-col mt-4'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                  <div className='relative'>
                    <Field
                      className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent dark:border-gray-400 dark:text-white'
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className='absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none'
                      onClick={togglePasswordVisibility}
                    >
                      <img src={eyeImage} alt="Eye Icon" className="w-6 h-6" />
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
                <div className='flex flex-col mt-1'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</label>
                  <div className='relative'>
                    <Field
                      className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent dark:border-gray-400 dark:text-white'
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className='absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none'
                      onClick={togglePasswordVisibility}
                    >
                      <img src={eyeImage} alt="Eye Icon" className="w-6 h-6" />
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      aria-describedby="newsletter"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="newsletter"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className='mt-4 flex justify-center items-center'>
                  <button
                    type="submit"
                    className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-600 border-none text-white text-sm shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Resetting...' : 'Reset password'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </RecoveryContext.Provider>
  );
}
