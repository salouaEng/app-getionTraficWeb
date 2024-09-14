import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import logo1 from "../assets/logo1.png";
import eye001 from "../assets/eye001.png";
import eyee from "../assets/eyee.png";
import loo from "../assets/loo.jpg";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeImage, setEyeImage] = useState(eyee);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeImage(showPassword ? eyee : eye001);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/user/registration",
        formData
      );
  
      // Show success notification
      toastr.success('Registration successful!', 'Success');
      console.log(response.data);
      const token = response.data.token; // Assuming the token is returned in the response
      localStorage.setItem("recoveryToken", token);

      // Log the token to the console
      console.log("Token stored in local storage:", localStorage.getItem("verificationToken"));
  
      // Redirect to login page after 5 seconds
      setTimeout(() => {
        navigate('/verification');
      }, 2000);
    } catch (error) {
      // Show error notification
      toastr.error('Registration failed: ' + error.response.data.message, 'Error');
      console.error("Registration failed:", error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 dark:bg-black">
        <div className="w-11/12 max-w-[700px] px-10 py-0 rounded-3xl bg-white border-2 border-gray-100 dark:bg-black dark:text-white dark:border-gray-400">
          <Link to="/" className="relative top-0 mt-0 ml-4 right-10">
            <ArrowBackIcon />
          </Link>
          <div className="flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={logo1}
                alt="Logo"
                className="w-[124px] h-[124px] rounded-full border border-white p-2 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-medium text-lg text-gray-500 dark:text-white ">
              Join The Community!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-medium text-lg text-gray-500 ">
              Create your account. Unlock a world of possibilities just for
              you.
            </p>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .matches(/^[A-Za-z ]+$/, "First Name should contain only letters")
                .required("First Name is required"),
              lastName: Yup.string()
                .matches(/^[A-Za-z ]+$/, "Last Name should contain only letters")
                .required("Last Name is required"),
              email: Yup.string().email("Invalid email address").required("Email is required"),
              password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
              ),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <div className="mt-0.5 flex flex-col">
                  <label className="text-lg font-medium ">First Name</label>
                  <Field
                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent  dark:border-gray-400"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="mt-1 flex flex-col">
                <label className="text-lg font-medium">Last Name</label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent  dark:border-gray-400"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
              <div className="mt-1 flex flex-col">
                <label className="text-lg font-medium">Email</label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent  dark:border-gray-400"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="flex flex-col mt-1">
                <label className="text-lg font-medium">Password</label>
                <div className="relative">
                  <Field
                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent  dark:border-gray-400"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                  <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    <img src={eyeImage} alt="Eye Icon" className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-1">
                <label className="text-lg font-medium">Confirm Password</label>
                <div className="relative">
                  <Field
                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent  dark:border-gray-400"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                  <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    <img src={eyeImage} alt="Eye Icon" className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-y-2">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:bg-gradient-to-l text-white font-bold text-lg flex justify-center items-center"
                >
                  Sign Up
                </button>
                <div className="flex justify-center items-center">
                  <p className="font-medium text-base">Already have an account?</p>
                  <Link to="/login" className="ml-2 font-medium text-base text-blue-500">
                    Sign In
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <img src={loo} className="hidden lg:block w-full h-full object-cover" alt="Register" />
      </div>
    </div>
  );
}

export default Register;
